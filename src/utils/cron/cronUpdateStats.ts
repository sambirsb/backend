import cron from 'node-cron';
import { Connection } from 'mongoose';
import { UPDATE_STATS_INTERVAL } from '../../constants/updateStats';
import creatorService from '../../services/CreatorService';
import updateScrapeService from '../../services/UpdateScrapeService';
import { ICreator } from '../../types';

export async function cronUpdateStats(sta: Connection) {
    cron.schedule(UPDATE_STATS_INTERVAL, async () => {
        const creators =
            (await creatorService.getCreatorsForUpdateStats()) as ICreator[];

        await updateScrapeService.cronUpdateStats(creators, sta);
    });
}
