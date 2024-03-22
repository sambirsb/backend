import {
    OFAvatarThumbs,
    OFHeaderSize,
    OFHeaderThumbs,
    OFSubscribedData,
} from './OFLibTypes';

interface HasNewTicketReplies {
    open: boolean;
    solved: boolean;
    closed: boolean;
}

interface FaceIdRegular {
    needToShow: boolean;
    canPostpone: boolean;
}

export interface OFPublicResponseData {
    view: string;
    avatar: string;
    avatarThumbs: OFAvatarThumbs;
    header: string | null;
    headerSize: OFHeaderSize;
    headerThumbs: OFHeaderThumbs;
    id: number;
    name: string;
    username: string;
    canLookStory: boolean;
    canCommentStory: boolean;
    hasNotViewedStory: boolean;
    isVerified: boolean;
    canPayInternal: boolean;
    hasScheduledStream: boolean;
    hasStream: boolean;
    hasStories: boolean;
    tipsEnabled: boolean;
    tipsTextEnabled: boolean;
    tipsMin: number;
    tipsMinInternal: number;
    tipsMax: number;
    canEarn: boolean;
    canAddSubscriber: boolean;
    subscribePrice: number;
    hasStripe: boolean;
    isStripeExist: boolean;
    subscriptionBundles: any[];
    canSendChatToAll: boolean;
    creditsMin: number;
    creditsMax: number;
    isPaywallPassed: boolean;
    unprofitable: boolean;
    listsSort: string;
    listsSortOrder: string;
    canCreateLists: boolean;
    joinDate: string;
    isReferrerAllowed: boolean;
    about: string;
    rawAbout: string;
    website: string | null;
    wishlist: string | null;
    location: string | null;
    postsCount: number;
    archivedPostsCount: number;
    privateArchivedPostsCount: number;
    photosCount: number;
    videosCount: number;
    audiosCount: number;
    mediasCount: number;
    lastSeen: string;
    favoritesCount: number;
    favoritedCount: number;
    showPostsInFeed: boolean;
    canReceiveChatMessage: boolean;
    isPerformer: boolean;
    isRealPerformer: boolean;
    isSpotifyConnected: boolean;
    subscribersCount: number;
    hasPinnedPosts: boolean;
    hasLabels: boolean;
    canChat: boolean;
    callPrice: number;
    isPrivateRestriction: boolean;
    showSubscribersCount: boolean;
    showMediaCount: boolean;
    subscribedByData: OFSubscribedData;
    subscribedOnData: OFSubscribedData;
    canPromotion: boolean;
    canCreatePromotion: boolean;
    canCreateTrial: boolean;
    isAdultContent: boolean;
    canTrialSend: boolean;
    requireCardVerification: boolean;
    canAddPhone: boolean;
    phoneLast4: string | null;
    phoneMask: string | null;
    hasNewTicketReplies: HasNewTicketReplies;
    hasInternalPayments: boolean;
    isCreditsEnabled: boolean;
    creditBalance: number;
    isMakePayment: boolean;
    isAgeVerified: boolean;
    ageVerificationRequired: boolean;
    isOtpEnabled: boolean;
    email: string;
    isEmailChecked: boolean;
    isLegalApprovedAllowed: boolean;
    isTwitterConnected: boolean;
    twitterUsername: string | null;
    isAllowTweets: boolean;
    isPaymentCardConnected: boolean;
    referalUrl: string;
    isVisibleOnline: boolean;
    subscribesCount: number;
    canPinPost: boolean;
    hasNewAlerts: boolean;
    hasNewHints: boolean;
    hasNewChangedPriceSubscriptions: boolean;
    notificationsCount: number;
    hasSystemNotifications: boolean;
    chatMessagesCount: number;
    countPinnedChat: number;
    isWantComments: boolean;
    watermarkText: string;
    customWatermarkText: string | null;
    hasWatermarkPhoto: boolean;
    hasWatermarkVideo: boolean;
    watermarkPosition: string;
    isTelegramConnected: boolean;
    advBlock: string[];
    hasPurchasedPosts: boolean;
    isEmailRequired: boolean;
    payoutLegalApproveState: string;
    payoutLegalApproveRejectReason: string | null;
    enabledImageEditorForChat: boolean;
    shouldReceiveLessNotifications: boolean;
    canCalling: boolean;
    paidFeed: boolean;
    canSendSms: boolean;
    canAddFriends: boolean;
    isRealCardConnected: boolean;
    countPriorityChat: number;
    hasScenario: boolean;
    wsAuthToken: string;
    canAddCard: boolean;
    isWalletAutorecharge: boolean;
    walletAutorechargeAmount: number;
    walletAutorechargeMin: number;
    walletFirstRebills: boolean;
    canAlternativeWalletTopUp: boolean;
    needIVApprove: boolean;
    ivStatus: string | null;
    ivFailReason: string | null;
    ivCountry: string | null;
    ivFlow: string;
    forceFaceOtp: boolean;
    faceIdRegular: FaceIdRegular;
    ivRequestAlert: string;
    isVerifiedReason: boolean;
    canReceiveManualPayout: boolean;
    needUpdateBanking: boolean;
    canReceiveStripePayout: boolean;
    manualPayoutPendingDays: number;
    isNeedConfirmPayout: boolean;
    canStreaming: boolean;
    isScheduledStreamsAllowed: boolean;
    canMakeExpirePosts: boolean;
    trialMaxDays: number;
    trialMaxExpiresDays: number;
    messageMinPrice: number;
    messageMaxPrice: number;
    postMinPrice: number;
    postMaxPrice: number;
    callMinPrice: number;
    callMaxPrice: number;
    subscribeMinPrice: number;
    subscribeMaxPrice: number;
    bundleMaxPrice: number;
    unclaimedOffersCount: number;
    claimedOffersCount: number;
    withdrawalPeriod: string;
    canAddStory: boolean;
    canAddSubscriberByBundle: boolean;
    isSuggestionsOptOut: boolean;
    canCreateFundRaising: boolean;
    minFundRaisingTarget: number;
    maxFundRaisingTarget: number;
    disputesRatio: number;
    vaultListsSort: string;
    vaultListsSortOrder: string;
    canCreateVaultLists: boolean;
    labelsSort: string;
    labelsSortOrder: string;
    bookmarkCategoriesSort: string;
    bookmarkCategoriesOrder: string;
    canMakeProfileLinks: false;
    ivHideForPerformers: boolean;
    canChangeContentPrice: true;
    replyOnSubscribe: boolean;
    minPayoutSumm: number;
    canHasW9Form: boolean;
    isVatRequired: boolean;
    isCountryVatRefundable: boolean;
    isCountryVatNumberCollect: boolean;
    vatNumberName: string | null;
    isCountryWithVat: boolean;
    connectedOfAccounts: any[];
    hasPassword: boolean;
    canConnectOfAccount: boolean;
    pinnedPostsCount: number;
    maxPinnedPostsCount: number;
    isDeleteInitiated: boolean;
}