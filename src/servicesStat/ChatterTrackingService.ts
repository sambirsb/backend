import { Connection } from 'mongoose';
import ChatterTrackingModel from '../modelsStat/ChatterTrackingModel';
import teamService from '../services/TeamService';
import getOnlineStatus from '../utils/getOnlineStatus';
import { elevateError } from '../errors/elevateError';
import {
    ChangeChatterTrackingInput,
    DatesFilterInput,
} from '../generated/graphql';

class ChatterTrackingService {
    async getChatterTrackingApp(
        teamMemberId: string,
        token: string,
        sta: Connection
    ) {
        try {
            const ChatterTrackingModelObj = ChatterTrackingModel(sta);

            const existingDoc = await this.getChatterTrackingDocumentFilter(
                teamMemberId,
                ChatterTrackingModelObj,
                token
            );

            if (!existingDoc) {
                const newDoc = await ChatterTrackingModelObj.create({
                    teamMemberId,
                });
                return await newDoc.save();
            }

            return existingDoc;
        } catch (err) {
            elevateError(err);
        }
    }

    async getChatterTracking(
        input: DatesFilterInput,
        token: string,
        sta: Connection
    ) {
        try {
            const ChatterTrackingModelObj = ChatterTrackingModel(sta);

            const team = (await teamService.getTeamOnlyMembersPopulateUser(
                token
            )) as any;

            let totalSales = 0;
            let totalPPVsSent = 0;
            let totalPPVsUnlocked = 0;
            let totalFansChatted = 0;

            const statistic = await Promise.all(
                team.teamMemberIds.map(async (member: any) => {
                    const chatterTrackingMembers =
                        await ChatterTrackingModelObj.find({
                            teamMemberId: member.id,
                            createdAt: {
                                $gte: input.startDate,
                                $lte: input.endDate,
                            },
                        });

                    const aggregatedData = chatterTrackingMembers.reduce(
                        (acc, current) => {
                            acc.msgsSent += current.msgsSent;
                            acc.ppvsSent += current.ppvsSent;
                            acc.ppvsUnlocked += current.ppvsUnlocked;
                            acc.sales += current.sales;
                            acc.fansChatted += current.fansChatted;
                            return acc;
                        },
                        {
                            msgsSent: 0,
                            ppvsSent: 0,
                            ppvsUnlocked: 0,
                            sales: 0,
                            fansChatted: 0,
                        }
                    );

                    const goldenRatioRaw =
                        aggregatedData.msgsSent > 0
                            ? (aggregatedData.ppvsUnlocked /
                                  aggregatedData.msgsSent) *
                              100
                            : 0;
                    const goldenRatio = Math.round(goldenRatioRaw * 10) / 10;

                    return {
                        ...aggregatedData,
                        goldenRatio,
                        teamMember: {
                            avatar: member.userId?.avatarUrl || '',
                            name: member.memberName,
                            online: member.lastOnlineAt
                                ? getOnlineStatus(member.lastOnlineAt)
                                : 'never',
                        },
                    };
                })
            );
            statistic.forEach((member) => {
                totalSales += member.sales;
                totalPPVsSent += member.ppvsSent;
                totalPPVsUnlocked += member.ppvsUnlocked;
                totalFansChatted += member.fansChatted;
            });

            const avgFansChatted = Math.round(
                totalFansChatted / statistic.length
            );
            const unlockRate = Math.round(
                totalPPVsSent > 0
                    ? (totalPPVsUnlocked / totalPPVsSent) * 100
                    : 0
            );

            return {
                totalSales,
                unlockRate,
                totalPPVsUnlocked,
                avgFansChatted,
                statistic,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async changeChatterTrackingApp(
        input: ChangeChatterTrackingInput,
        token: string,
        sta: Connection
    ) {
        try {
            const ChatterTrackingModelObj = ChatterTrackingModel(sta);

            const existingDoc = await this.getChatterTrackingDocumentFilter(
                input.teamMemberId,
                ChatterTrackingModelObj,
                token
            );

            if (existingDoc) {
                await ChatterTrackingModelObj.updateOne(
                    { _id: existingDoc._id },
                    {
                        $inc: {
                            msgsSent: input.msgsSent || 0,
                            ppvsSent: input.ppvsSent || 0,
                            ppvsUnlocked: input.ppvsUnlocked || 0,
                            sales: input.sales || 0,
                            fansChatted: input.fansChatted || 0,
                        },
                    },
                    { new: true }
                );

                return await ChatterTrackingModelObj.findById(existingDoc._id);
            } else {
                const newDoc = await ChatterTrackingModelObj.create({
                    msgsSent: input.msgsSent || 0,
                    ppvsSent: input.ppvsSent || 0,
                    ppvsUnlocked: input.ppvsUnlocked || 0,
                    sales: input.sales || 0,
                    fansChatted: input.fansChatted || 0,
                    teamMemberId: input.teamMemberId,
                });
                return await newDoc.save();
            }
        } catch (err) {
            elevateError(err);
        }
    }

    async getChatterTrackingDocumentFilter(
        teamMemberId: string,
        ChatterTrackingModelObj: any,
        token: string
    ) {
        await teamService.checkTeamMemberToUser(token, teamMemberId);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return await ChatterTrackingModelObj.findOne({
            teamMemberId: teamMemberId,
            createdAt: {
                $gte: today,
                $lt: new Date(today).setDate(today.getDate() + 1),
            },
        });
    }
}

const chatterTrackingService = new ChatterTrackingService();
export default chatterTrackingService;
