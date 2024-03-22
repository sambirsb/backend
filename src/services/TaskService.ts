import { FilterQuery } from 'mongoose';
import TaskModel from '../models/TaskModel';
import authService from './AuthService';
import teamService from './TeamService';
import {
    checkPerformersInTeam,
    checkExistingTasksInDB,
    compareTaskIdsAndPerIds,
    getDataAfterUpdate,
    getDatesFilterDB,
    toTasksDB,
    toUpdateDataTasks,
} from '../utils';
import {
    validateChangeTaskInput,
    validateCreateTaskInput,
    validateDatesFilterInput,
    validateGetMyTeamTasksInput,
} from '../validation/taskValidation';
import { taskNotOwnerError } from '../errors/taskNotOwnerError';
import { elevateError } from '../errors/elevateError';
import { ITask, ITeam, ITeamMember } from '../types';
import {
    ChangeTaskInput,
    ChangeTaskStatusInput,
    CreateTaskInput,
    DatesFilterInput,
    GetMyTeamTasks,
    PerformerTask,
    Task,
} from '../generated/graphql';

class TaskService {
    private model: typeof TaskModel = TaskModel;

    async getTasksByIds(taskIds: string[]) {
        try {
            const tasks = await this.model.find({ _id: { $in: taskIds } });
            await checkExistingTasksInDB(tasks, taskIds);

            return tasks;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllTasksOwner(token: string, input: DatesFilterInput) {
        try {
            await validateDatesFilterInput(input);
            const ownerId = authService.getUserIdFromToken(token);
            const dateRangeCondition = getDatesFilterDB(
                input.startDate,
                input.endDate
            );

            return await this.model
                .find({
                    ownerId,
                    ...dateRangeCondition,
                })
                .populate(
                    'performer',
                    'teamId userId memberName active note role'
                );
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllPerformers(token: string) {
        try {
            return await teamService.getMembersWithoutPerms(token);
        } catch (err) {
            elevateError(err);
        }
    }

    async getMyTasks(token: string, input: DatesFilterInput) {
        try {
            await validateDatesFilterInput(input);
            const members = (await teamService.getAllMembersByToken(
                token
            )) as any[];
            const memberIds = members.map((member) => member.id);
            const dateRangeCondition = getDatesFilterDB(
                input.startDate,
                input.endDate
            );

            const filter = {
                $and: [
                    { performerId: { $in: memberIds } },
                    { ...dateRangeCondition },
                ],
            };

            return await this.getPerformerTasksByFilter(filter);
        } catch (err) {
            elevateError(err);
        }
    }

    async getMyTeamTasks(token: string, input: GetMyTeamTasks) {
        try {
            await validateGetMyTeamTasksInput(input);
            const team = (await teamService.getTeamByOwnerId(
                input.ownerId
            )) as ITeam;
            const userId = authService.getUserIdFromToken(token);
            const performer = (await teamService.getMemberByUserIdAndTeamId(
                userId,
                team.id
            )) as ITeamMember;

            const dateRangeCondition = getDatesFilterDB(
                input.startDate,
                input.endDate
            );

            const filter = {
                ownerId: input.ownerId,
                performerId: performer.id,
                ...dateRangeCondition,
            };

            return await this.getPerformerTasksByFilter(filter);
        } catch (err) {
            elevateError(err);
        }
    }

    async createTasks(token: string, input: CreateTaskInput) {
        try {
            await validateCreateTaskInput(input);

            const team = (await teamService.getTeamByOwnerToken(
                token
            )) as ITeam;

            await checkPerformersInTeam(team, input);
            const dataForDB = toTasksDB(team.ownerId.toString(), input);

            const resultTasks = await this.model.insertMany(dataForDB);

            return (await this.model
                .find({ _id: { $in: resultTasks } })
                .populate(
                    'performer',
                    'teamId memberName userId active note role'
                )) as Task[];
        } catch (err) {
            elevateError(err);
        }
    }

    async changeTasks(token: string, input: ChangeTaskInput) {
        try {
            await validateChangeTaskInput(input);
            const team = (await teamService.getTeamByOwnerToken(
                token
            )) as ITeam;

            await checkPerformersInTeam(team, input);
            const existingTasks = (await this.getTasksByIds(
                input.taskIds
            )) as ITask[];

            if (existingTasks.length === 0) {
                throw new Error('Tasks not found.');
            }

            const {
                perfIdsForCreateTasks,
                taskIdsForDelete,
                taskIdsForUpdate,
            } = compareTaskIdsAndPerIds(existingTasks, input.performerIds);

            if (!taskIdsForUpdate.length) {
                throw new Error('No tasks to update.');
            }

            const updateData = toUpdateDataTasks(input);

            await this.model.updateMany(
                { _id: { $in: taskIdsForUpdate } },
                { $set: updateData },
                { new: true }
            );

            const updatedTasks = (await this.model.find({
                _id: { $in: taskIdsForUpdate },
            })) as ITask[];

            let createdTasks: ITask[] = [];

            if (perfIdsForCreateTasks.length > 0) {
                const createData = getDataAfterUpdate(
                    updatedTasks[0],
                    perfIdsForCreateTasks
                );

                createdTasks = await this.model.insertMany(createData);
            }

            const resultTasks = [...updatedTasks, ...createdTasks];

            if (taskIdsForDelete.length > 0) {
                await this.deleteManyT(taskIdsForDelete);
            }

            return (await this.model
                .find({ _id: { $in: resultTasks } })
                .populate(
                    'performer',
                    'teamId memberName userId active note role'
                )) as Task[];
        } catch (err) {
            elevateError(err);
        }
    }

    async changeTaskStatus(token: string, input: ChangeTaskStatusInput) {
        try {
            const userId = authService.getUserIdFromToken(token);
            const performer = (await teamService.getMemberByUserIdAndTeamId(
                userId,
                input.teamId
            )) as ITeamMember;
            if (!performer) {
                throw new Error('Performer is undefined');
            }

            const updatedTask = await this.model
                .findOneAndUpdate(
                    { _id: input.taskId, performerId: performer.id },
                    { $set: { status: input.status } },
                    { new: true, runValidators: true }
                )
                .populate(
                    'performer',
                    'teamId memberName userId active note role'
                );

            if (!updatedTask) {
                throw new Error(
                    'Task not found or user is not the performer of this task.'
                );
            }

            return updatedTask;
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteTasks(token: string, taskIds: string[]) {
        try {
            const userId = authService.getUserIdFromToken(token);

            const tasksNotOwned = (await this.model
                .find({
                    _id: { $in: taskIds },
                    ownerId: { $ne: userId },
                })
                .select('_id')) as ITask[];

            await taskNotOwnerError(tasksNotOwned);

            await this.model.deleteMany({
                _id: { $in: taskIds },
                ownerId: userId,
            });

            return `Tasks with IDs ${taskIds.join(', ')} deleted.`;
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteMemberTasks(teamMemberId: string) {
        try {
            await this.model.deleteMany({ performerId: teamMemberId });
        } catch (err) {
            elevateError(err);
        }
    }

    private async getPerformerTasksByFilter(
        filter: FilterQuery<any>
    ): Promise<PerformerTask[]> {
        try {
            const tasks = (await this.model
                .find(filter)
                .populate(
                    'performer',
                    'teamId memberName userId active note role'
                )
                .lean()) as any[];

            return tasks.map((task) => ({
                ...task,
                id: task._id.toString(),
                performer: {
                    ...task.performer,
                    id: task.performer._id.toString(),
                },
            }));
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    private async deleteManyT(taskIds: string[]) {
        try {
            await this.model.deleteMany({ _id: { $in: taskIds } });
        } catch (err) {
            elevateError(err);
        }
    }
}

const taskService = new TaskService();
export default taskService;
