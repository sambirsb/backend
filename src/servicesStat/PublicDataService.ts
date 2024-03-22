import { Connection } from 'mongoose';
import { User } from '@imperatrona/onlyfans-scraper/dist/types';
import PublicDataModel from '../modelsStat/PublicDataModel';
import scraperService from '../services/ScraperService';
import { IPublicData } from '../typesStat';

class PublicDataService {
    async getPublicData(pathId: string, statConnection: Connection) {
        try {
            const PublicDataModelObj = PublicDataModel(statConnection);
            const existingPublicData = (await PublicDataModelObj.findOne({
                pathId,
            })) as IPublicData;

            if (!existingPublicData) {
                return {
                    _id: '',
                    pathId: pathId,
                    avatarURL: '',
                    userName: '',
                    joinDate: '',
                };
            }

            const {
                _id: _id_exciting,
                avatarURL,
                userName,
                joinDate,
            } = existingPublicData;

            return {
                _id: _id_exciting || '',
                avatarURL: avatarURL || '',
                userName: userName || '',
                joinDate: joinDate || '',
            } as IPublicData;
        } catch (err: any) {
            console.error('Error:', err);
            throw err;
        }
    }

    async scrapedMissingPublicData(
        friendUserNames: string[],
        statConnection: Connection
    ) {
        const missingFriendPaths =
            await publicDataService.findMissingFriendPathIds(
                friendUserNames,
                statConnection
            );

        const scrapePromises = missingFriendPaths.map((pathId) =>
            scraperService.getPublicData(pathId, statConnection)
        );

        await Promise.all(scrapePromises);
    }

    private async findMissingFriendPathIds(
        friendUserNames: string[],
        statConnection: Connection
    ): Promise<string[]> {
        try {
            const PublicDataModelObj = PublicDataModel(statConnection);

            const existingFriendData = (await PublicDataModelObj.find({
                pathId: { $in: friendUserNames },
            }).select('pathId')) as IPublicData[];

            const existingFriendPathIds = existingFriendData.map(
                (data) => data.pathId
            );

            return friendUserNames.filter(
                (userName) => !existingFriendPathIds.includes(userName)
            );
        } catch (err: any) {
            console.error('Error:', err);
            throw err;
        }
    }

    async createPublicData(
        data: User,
        pathId: string,
        statConnection: Connection
    ) {
        try {
            const PublicDataModelObj = PublicDataModel(statConnection);

            const publicDataInstance = new PublicDataModelObj({
                pathId,
                _id: data.id,
                avatarURL: data.avatar,
                userName: data.name,
                joinDate: data.joinDate,
            }) as IPublicData;

            await publicDataInstance.save();

            return publicDataInstance;
        } catch (err: any) {
            console.error('Error:', err.data);
            throw err;
        }
    }
}
const publicDataService = new PublicDataService();
export default publicDataService;
