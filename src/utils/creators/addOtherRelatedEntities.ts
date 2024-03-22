import visibilityService from '../../services/VisibilityService';
import welcomeSettingsService from '../../services/WelcomeSettingsService';
import ppvFollowService from '../../services/pPVFollowService';
import promotionReactivatorService from '../../services/PromotionReactivatorService';
import fanNumberingService from '../../services/FanNumberingService';
import autoFollowService from '../../services/AutoFollowService';
import expiringFansService from '../../services/ExpiringFansService';
import displaySettingsService from '../../services/DisplaySettingsService';
import teamService from '../../services/TeamService';

export const addOtherRelatedEntities = async (
    creatorId: string,
    userId: string
) => {
    await Promise.all([
        visibilityService.createVisibility({ creatorId: creatorId }),
        welcomeSettingsService.createWelcomeSettings(creatorId, userId),
        ppvFollowService.createPPVFollow(userId, {
            creatorId: creatorId,
        }),
        promotionReactivatorService.createPromotionReactivator(
            creatorId,
            userId
        ),
        fanNumberingService.createFanNumbering(creatorId, userId),
        autoFollowService.createAutoFollow(creatorId, userId),
        expiringFansService.createExpiringFans(creatorId, userId),
        displaySettingsService.createDisplaySettings(creatorId, userId),
        teamService.addCreatorToTeam(creatorId, userId),
    ]);
};
