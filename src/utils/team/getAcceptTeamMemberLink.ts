import crypto from 'crypto';
import {
    ACCEPT_TEAM_MEMBER_LINK_EXPIRE,
    RANDOM_MEMBER_TOKEN_SIZE,
} from '../../constants/others';
import {
    ENDPOINTS_TC_FRONT,
    FILTERS_TC_FRONT,
} from '../../constants/apiEndpointsTCFront';
import { config } from '../../constants/config/env';

export const getAcceptTeamMemberLink = () => {
    const memberToken = crypto
        .randomBytes(RANDOM_MEMBER_TOKEN_SIZE)
        .toString('hex');
    const expire = new Date(
        Date.now() + 1000 * 60 * ACCEPT_TEAM_MEMBER_LINK_EXPIRE
    );
    const link = `${config.FRONTEND_URL}${ENDPOINTS_TC_FRONT.ACCEPT_MEMBER_LINK}${FILTERS_TC_FRONT.TOKEN}${memberToken}`;

    return {
        memberToken,
        expire,
        link,
    };
};
