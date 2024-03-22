export interface OFCollectionListResponse {
    list: OFCollectionItem[];
    hasMore: boolean;
}

export interface OFCollectionItem {
    id: string | number;
    type: string;
    name: string;
    usersCount: number;
    postsCount: number;
    order: string;
    direction: string;
    canUpdate: boolean;
    canDelete: boolean;
    canManageUsers: boolean;
    canAddUsers: boolean;
    canPinnedToFeed: boolean;
    isPinnedToFeed: boolean;
    canPinnedToChat: boolean;
    isPinnedToChat: boolean;
    // customOrderUsersIds: []; TODO don't have example right now
    // posts: []; TODO don't have example right now
    // sortList: []; TODO don't have example right now
    users: CollectionItemUser[];
}

interface CollectionItemUser {
    id: number;
    _view: string;
}
