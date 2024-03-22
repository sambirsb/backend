import { toAutoProxyResponseType } from '../';

export const toTransformedTeams = (members: any) => {
    return members.map((member: any) => ({
        ...member.team.toObject(),
        creators: member?.permissions?.map((permission: any) => ({
            ...(permission.creatorId
                ? {
                      ...permission.creatorId.toObject(),
                      proxy: toAutoProxyResponseType(
                          permission.creatorId.proxy
                      ),
                  }
                : {}),
            permissions: permission,
        })),
    }));
};
