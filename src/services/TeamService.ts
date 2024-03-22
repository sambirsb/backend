import { Types } from 'mongoose';
import { MemberRole } from '../constants/MemberRole';
import TeamModel from '../models/TeamModel';
import TeamMemberModel from '../models/TeamMemberModel';
import authService from './AuthService';
import userService from './UserService';
import creatorService from './CreatorService';
import taskService from './TaskService';
import {
    getAcceptTeamMemberLink,
    toTMMongo,
    toTMGraphQL,
    checkTeamCreators,
    getOwnerPermissions,
    updateTeamMember,
    sendAddTeamMemberEmail,
    sendEmailWithAcceptTMLink,
    toPerformersWithoutPerms,
    toTMWithEmails,
    toTMMongoWithEmail,
    toTeamPopulated,
    deleteImageFromS3,
    toTransformedTeams,
} from '../utils';
import {
    validateAddTeamMemberInput,
    validateChangeTeamMemberInput,
} from '../validation/teamMemberValidation';
import { elevateError } from '../errors/elevateError';
import {
    CreateOwnerTeamMemberInput,
    CreateTeamMemberInput,
    ITeam,
    ITeamMember,
    PayloadExtension,
    TeamDBPopulated,
} from '../types';
import {
    AddTeamMemberInput,
    ChangeTeamInput,
    ChangeTeamMemberInput,
} from '../generated/graphql';

class TeamService {
    private teamModel: typeof TeamModel = TeamModel;
    private memberModel: typeof TeamMemberModel = TeamMemberModel;

    async getMemberById(id: string) {
        try {
            return await this.memberModel.findById(id);
        } catch (err) {
            elevateError(err);
        }
    }

    async getTeamOnlyMembersPopulateUser(token: string) {
        try {
            const ownerId = authService.getUserIdFromToken(token);

            return await this.teamModel.findOne({ ownerId }).populate({
                path: 'teamMemberIds',
                match: { role: 'Member' },
                populate: 'userId',
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async getMemberByUserId(userId: string) {
        try {
            return await this.memberModel.findOne({ userId });
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllMembersByToken(token: string) {
        try {
            const userId = authService.getUserIdFromToken(token);

            const members = (await this.memberModel
                .find({ userId })
                .populate('userId', 'email')
                .lean()) as any[];

            return toTMWithEmails(members);
        } catch (err) {
            elevateError(err);
        }
    }

    async getMyTeamPopulatedByToken(token: string) {
        try {
            const ownerId = authService.getUserIdFromToken(token);
            let team = await this.findAndPopulateTeam({ ownerId });

            if (!team) {
                const teamExisting = await this.createTeam(ownerId);

                if (!teamExisting) throw new Error('Team cannot be created');

                team = await this.findAndPopulateTeam({
                    _id: teamExisting._id,
                });
            }

            return toTeamPopulated(team);
        } catch (err) {
            elevateError(err);
        }
    }

    async getMemberByUserIdAndTeamId(userId: string, teamId: string) {
        try {
            return await this.memberModel.findOne({ userId, teamId });
        } catch (err) {
            elevateError(err);
        }
    }

    async getMemberByIdUserId(_id: string, userId: string) {
        try {
            const teamMember = await this.memberModel.findOne({
                _id,
                userId,
            });

            if (!teamMember) {
                throw new Error('You do not have access to this creator');
            }

            return teamMember;
        } catch (err) {
            elevateError(err);
        }
    }

    async getMemberByLinkToken(memberToken: string) {
        try {
            const member = await TeamMemberModel.findOne({
                'acceptLink.memberToken': memberToken,
                'acceptLink.expire': { $gt: new Date() },
            });

            if (!member) {
                throw new Error('Member not found or link expired');
            }

            return member;
        } catch (err) {
            elevateError(err);
        }
    }

    async getTeamOrCreate(ownerId: string) {
        try {
            let team = await this.getTeamByOwnerId(ownerId);

            if (!team) {
                team = await this.createTeam(ownerId);
            }

            if (!team) {
                throw new Error(`Team not found for owner ${ownerId}.`);
            }

            return team;
        } catch (err) {
            elevateError(err);
        }
    }

    async getTeamByOwnerId(ownerId: string) {
        try {
            const team = (await this.teamModel.findOne({ ownerId })) as ITeam;

            if (!team) {
                return null;
            }

            return team;
        } catch (err) {
            elevateError(err);
        }
    }

    async getTeamByOwnerToken(ownerToken: string) {
        try {
            const userId = authService.getUserIdFromToken(ownerToken);
            const team = await this.getTeamByOwnerId(userId);

            if (!team) throw new Error('Team not found');

            return team;
        } catch (err) {
            elevateError(err);
        }
    }

    async getMembersWithoutPerms(ownerToken: string) {
        try {
            const ownerId = authService.getUserIdFromToken(ownerToken);
            const team = (await this.teamModel
                .findOne({ ownerId })
                .populate('teamMemberIds', 'memberName userId active note role')
                .lean()) as any;

            return toPerformersWithoutPerms(team);
        } catch (err) {
            elevateError(err);
        }
    }

    async getTeamMemberIdByExtension(userId: string, creatorId: string) {
        try {
            const teamMember = (await this.memberModel.findOne({
                userId,
                'permissions.creatorId': creatorId,
            })) as ITeamMember;

            return teamMember?.id;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllTeamsRelatedToUser(userId: string) {
        try {
            const members: any[] = await this.memberModel
                .find({ userId })
                .populate({
                    path: 'permissions.creatorId',
                    populate: {
                        path: 'proxy',
                    },
                })
                .populate({
                    path: 'team',
                });

            return toTransformedTeams(members);
        } catch (err) {
            elevateError(err);
        }
    }

    async addTeamMember(token: string, input: AddTeamMemberInput) {
        try {
            await validateAddTeamMemberInput(input);
            const user = await userService.findUserByEmail(input.email);

            if (!user) {
                throw new Error(`User with email ${input.email} not found.`);
            }

            const team = await this.getTeamOrCreate(input.ownerId);

            if (!team) {
                throw new Error(`Team not found for owner ${input.ownerId}.`);
            }

            await checkTeamCreators(input, team.creatorIds);

            await this.checkExistingMemberInsideTeam(team.id, user.id);

            const result = getAcceptTeamMemberLink();

            if (!result) {
                throw new Error(
                    'Failed to generate link for accepting team member request.'
                );
            }

            const { memberToken, expire, link } = result;

            const member = (await this.createTeamMember(
                toTMMongo(team, user, input, memberToken, expire)
            )) as ITeamMember;

            team.teamMemberIds.push(member.id);
            await team.save();

            await sendEmailWithAcceptTMLink(link, input.email, team.teamName);

            return toTMMongoWithEmail(input.email, member);
        } catch (err) {
            elevateError(err);
        }
    }

    async acceptTeamMember(memberToken: string) {
        try {
            const member = (await this.getMemberByLinkToken(
                memberToken
            )) as ITeamMember;

            member.active = true;
            member.acceptLink = null;
            await member.save();

            const user = await userService.getUserById(
                member.userId.toString()
            );
            const team = (await this.teamModel.findOne({
                teamMemberIds: { $in: [member.id] },
            })) as ITeam;

            await sendAddTeamMemberEmail(user.email, team.teamName);

            return {
                teamMember: toTMGraphQL(member),
                message: `Team member ${member.memberName} successfully accepted.`,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async changeTeamMember(input: ChangeTeamMemberInput) {
        try {
            await validateChangeTeamMemberInput(input);
            const member = (await this.memberModel
                .findById(input.teamMemberId)
                .populate('userId', 'email')) as any;

            const email = member.userId.email;
            member.userId = member.userId._id;

            if (!member) {
                throw new Error(
                    `Team member with id ${input.teamMemberId} not found.`
                );
            }

            const updatedMember = await updateTeamMember(input, member);

            if (!updatedMember) {
                throw new Error(
                    `Failed to update team member with id ${input.teamMemberId}.`
                );
            }

            await updatedMember.save();

            return toTMMongoWithEmail(email, updatedMember);
        } catch (err) {
            elevateError(err);
        }
    }

    async createTeamMember(input: CreateTeamMemberInput) {
        try {
            return await this.memberModel.create({
                ...input,
                active: false,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async createOwnerTeamMember(input: CreateOwnerTeamMemberInput) {
        try {
            const { teamId, userId, memberName, creatorIds } = input;
            const permissions = creatorIds.map((creatorId) => ({
                creatorId: creatorId,
                ...getOwnerPermissions(),
            }));

            return await this.memberModel.create({
                teamId,
                userId,
                memberName,
                active: true,
                permissions,
                role: MemberRole.OWNER,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async createTeam(ownerId: string) {
        try {
            const result = await this.generateTeamName(ownerId);

            if (!result) {
                throw new Error(
                    `Failed to generate team name for owner ${ownerId}.`
                );
            }

            const { teamName, ownerName } = result;

            const creatorIds =
                await creatorService.getCreatorIdsByUserId(ownerId);

            const team = (await this.teamModel.create({
                ownerId,
                teamName,
                teamMemberIds: [],
                creatorIds: creatorIds.map((id) => new Types.ObjectId(id)),
            })) as ITeam;

            if (!team) {
                throw new Error(`Team ${teamName} not created.`);
            }

            const ownerMember = await this.createOwnerTeamMember({
                teamId: team._id.toString(),
                userId: ownerId,
                memberName: ownerName,
                creatorIds,
            });

            if (!ownerMember) {
                throw new Error(`Team member ${ownerName} not created.`);
            }

            team.teamMemberIds.push(ownerMember.id);
            await team.save();

            return team;
        } catch (err) {
            elevateError(err);
        }
    }

    async addCreatorToTeam(creatorId: string, ownerId: string) {
        try {
            const team = await this.getTeamByOwnerId(ownerId);

            if (!team) return;

            await this.teamModel.updateOne(
                { _id: team.id },
                { $addToSet: { creatorIds: creatorId } }
            );

            const ownerAsMember = (await this.getMemberByUserIdAndTeamId(
                ownerId,
                team.id
            )) as ITeamMember;

            if (!ownerAsMember) return;

            ownerAsMember.permissions.push({
                creatorId: new Types.ObjectId(creatorId),
                ...getOwnerPermissions(),
            });

            await ownerAsMember.save();
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteMember(token: string, memberId: string) {
        try {
            const team = (await this.getTeamByOwnerToken(token)) as ITeam;

            const member = (await this.getMemberById(memberId)) as ITeamMember;

            if (!member) {
                throw new Error('Member not found');
            }

            if (member.teamId.toString() !== team._id.toString()) {
                throw new Error('You are not allowed to delete this member');
            }

            if (team.ownerId.toString() == member.userId.toString()) {
                throw new Error('You are not allowed to delete yourself');
            }

            await this.memberModel.findByIdAndDelete(member.id);

            team.teamMemberIds = team.teamMemberIds.filter(
                (id) => id.toString() !== member.id
            );
            await team.save();

            await taskService.deleteMemberTasks(member.id);

            return `Member ${member.memberName} successfully deleted.`;
        } catch (err) {
            elevateError(err);
        }
    }

    async changeLastOnlineExtension(token: string, teamMemberId: string) {
        try {
            const lastOnlineAt = new Date();
            const tokenData = authService.getDataFromExtensionToken(
                token
            ) as PayloadExtension;
            await this.getMemberByIdUserId(teamMemberId, tokenData.id);

            return await this.memberModel.findByIdAndUpdate(
                teamMemberId,
                { lastOnlineAt },
                { new: true }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    private async findAndPopulateTeam(query: object): Promise<TeamDBPopulated> {
        return this.teamModel
            .findOne(query)
            .populate({
                path: 'teamMemberIds',
                populate: { path: 'userId', select: 'email' },
            })
            .lean() as Promise<TeamDBPopulated>;
    }

    async removeCreatorFromAllTeams(creatorId: string) {
        try {
            return await this.teamModel.updateMany(
                { creatorIds: creatorId },
                { $pull: { creatorIds: creatorId } }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async removeCreatorFromAllTeamMembers(creatorId: string) {
        try {
            return await this.memberModel.updateMany(
                { 'permissions.creatorId': creatorId },
                { $pull: { permissions: { creatorId: creatorId } } }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async removeTeamMembersByCreatorId(creatorId: string) {
        try {
            return await this.memberModel.deleteMany({
                'team.creatorId': creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async checkTeamMemberToUser(token: string, teamMemberId: string) {
        try {
            const tokenData = authService.getDataFromExtensionToken(
                token
            ) as PayloadExtension;
            const member = await this.memberModel.findOne({
                userId: tokenData.id,
                _id: teamMemberId,
            });

            if (!member) {
                throw new Error('You are not owner of this teamMember');
            }
        } catch (err) {
            elevateError(err);
        }
    }

    async changeTeam(userId: string, input: ChangeTeamInput) {
        const team = (await this.teamModel.findOne({
            ownerId: userId,
        })) as ITeam;
        if (!team) {
            throw new Error('Team not found');
        }

        if (input.logoUrl === '') {
            if (team.logoUrl) {
                const fileName = team.logoUrl.split('/').pop() as string;
                await deleteImageFromS3(fileName);
            }

            team.logoUrl = undefined;
        } else if (input.logoUrl) {
            team.logoUrl = input.logoUrl;
        }

        if (input.name) team.teamName = input.name;

        return await team.save();
    }

    private async generateTeamName(ownerId: string) {
        try {
            const owner = await userService.getUserById(ownerId);

            return {
                teamName: `Team ${owner.fullName}`,
                ownerName: `${owner.fullName}`,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    private async checkExistingMemberInsideTeam(
        teamId: string,
        userId: string
    ) {
        try {
            const existingMember = await this.memberModel.findOne({
                userId,
                teamId,
            });

            if (existingMember) {
                throw new Error(
                    `User ${userId} is already a member of team ${teamId}.`
                );
            }
        } catch (err) {
            elevateError(err);
        }
    }
}

const teamService = new TeamService();
export default teamService;
