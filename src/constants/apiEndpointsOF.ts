export const API_BASE_OF: string = process.env.ONLYFANS_API_PATH!;
export const ONLYFANS_URL: string = process.env.ONLYFANS_URL!;

export const ENDPOINTS_OF = {
    publicData: `${API_BASE_OF}/users`,
    chart: `${API_BASE_OF}/earnings/chart`,
    subscribersChart: `${API_BASE_OF}/subscriptions/subscribers/chart`,
    subscribersTop: `${API_BASE_OF}/subscriptions/subscribers/top`,
    subscribersLatest: `${API_BASE_OF}/subscriptions/subscribers/latest`,
    transactions: `${API_BASE_OF}/payouts/transactions`,
    chatters: `${API_BASE_OF}/chats`,
    visitors: `${API_BASE_OF}/users/me/profile/stats`,
    vaultLists: `${API_BASE_OF}/vault/lists`,
    vaultCustomMedia: `${API_BASE_OF}/vault/media`,
    me: `${API_BASE_OF}/users/me`,
    collectionsLists: `${API_BASE_OF}/lists`,
    listsUsers: `${API_BASE_OF}/lists/users`,
    promotions: `${API_BASE_OF}/promotions`,
};

export const FILTERS_OF = {
    amountFilter:
        '' +
        '&withTotal=true' +
        '&filter[total_amount]=total_amount' +
        '&filter[subscribes_amount]=subscribes_amount' +
        '&filter[tips_amount]=tips_amount' +
        '&filter[post_amount]=post_amount' +
        '&filter[messages_amount]=messages_amount' +
        '&filter[ref_amount]=ref_amount' +
        '&filter[stream_amount]=stream_amount',
    totalAndOffset: '&by=total&offset=0',
    chatsLimit: '?limit=1000&offset=0&skip_users=all&order=recent',
    messagesLimit: 'messages?limit=1000&order=desc&skip_users=all',
    vaultListsLimit: '?view=main&offset=0&limit=100',
    vaultMediaLimit: '?limit=24&offset=0&field=recent&sort=desc&list=',
    collectionsListsLimit:
        '?offset=0&skip_users=all&limit=1000&format=infinite',
    oneListLimit: '?offset=0&limit=1000&format=infinite',
    messages: 'messages',
};
