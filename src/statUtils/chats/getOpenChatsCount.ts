import {
    ChatsDataWithCreatorIdAndName,
    OpenChatsCountWithCreatorIdAndName,
} from '../../typesStat';

export const getOpenChatsCount = async (
    data: ChatsDataWithCreatorIdAndName[]
): Promise<OpenChatsCountWithCreatorIdAndName[]> => {
    return data.map(({ creatorId, creatorName, chatsRespData }) => {
        return {
            creatorId,
            creatorName,
            openChats: chatsRespData.length,
            sellingChats: chatsRespData.filter((chat) => chat.hasSellingChat)
                .length,
        };
    });
};
