import Scrapy from '@imperatrona/onlyfans-scraper';
import { ONLYFANS_URL } from '../../constants/apiEndpointsOF';
import { User } from '@imperatrona/onlyfans-scraper/dist/types';

interface UserImperWithId {
    data: User;
    pathId: string;
}

export const getPublicLibScraperData = async (
    link: string
): Promise<UserImperWithId> => {
    try {
        const pathId = link.replace(`${ONLYFANS_URL}/`, '');
        const client = new Scrapy();

        const data = await client.getUser(pathId);

        if (!data) {
            throw new Error(
                'Response data for scraped public data using imperatrona lib is undefined'
            );
        }

        return {
            data,
            pathId,
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
