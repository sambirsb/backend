import { ENDPOINTS_OF, ONLYFANS_URL } from '../../constants/apiEndpointsOF';
import { OLDscrapePublicDataCustom } from './OLDscrapePublicDataCustom';
import { OFPublicResponseData } from '../../typesStat/fromOF/OFPublicResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const OLDgetPublicScrapedData = async (
    link: string,
    creatorAuth: CreatorAuth
): Promise<{ data: OFPublicResponseData; pathId: string }> => {
    try {
        const pathId = link.replace(`${ONLYFANS_URL}/`, '');
        const publicDataPath = `${ENDPOINTS_OF.publicData}/${pathId}`;

        const data = await OLDscrapePublicDataCustom(
            publicDataPath,
            creatorAuth
        );

        if (!data) {
            throw new Error('Response data is undefined');
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
