export interface ChatFirstMessageDates {
    [userId: number]: {
        firstMessageDate: string;
        hasSellingChat: boolean;
    };
}

export interface CountsByDate {
    [key: string]: {
        openChats: number;
        sellingChats: number;
    };
}

export interface OpenChatsCount {
    date: string;
    openChats: number;
    sellingChats: number;
}
