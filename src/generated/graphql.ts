import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never;
      };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    Date: { input: any; output: any };
};

export type AcceptLink = {
    expire?: Maybe<Scalars['Date']['output']>;
    memberToken?: Maybe<Scalars['String']['output']>;
};

export type AddCreatorExtensionInput = {
    avatarURL?: InputMaybe<Scalars['String']['input']>;
    joinDate: Scalars['Date']['input'];
    link: Scalars['String']['input'];
    userName: Scalars['String']['input'];
    user_id: Scalars['String']['input'];
};

export type AddCreatorResponse = {
    creator?: Maybe<CreatorForAddCreatorResponse>;
    message?: Maybe<Scalars['String']['output']>;
};

export type AddPreferencesInput = {
    chatterId: Scalars['String']['input'];
    preferencesText: Array<Scalars['String']['input']>;
    user_id: Scalars['String']['input'];
};

export type AddTeamMemberInput = {
    email: Scalars['String']['input'];
    name: Scalars['String']['input'];
    note?: InputMaybe<Scalars['String']['input']>;
    ownerId: Scalars['ID']['input'];
    permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
};

export type AddVaultMediaResponse = {
    message?: Maybe<Scalars['String']['output']>;
    vaultMedia?: Maybe<VaultMedia>;
};

export type AppAuth = {
    bcTokenSha?: Maybe<Scalars['String']['output']>;
    sess?: Maybe<Scalars['String']['output']>;
};

export type AppDataExtInput = {
    bcTokenSha?: InputMaybe<Scalars['String']['input']>;
    sess?: InputMaybe<Scalars['String']['input']>;
    user_id: Scalars['String']['input'];
};

export type AutoFollow = {
    active: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    minSpend?: Maybe<Scalars['Int']['output']>;
};

export type Best = {
    average?: Maybe<Scalars['Float']['output']>;
    name?: Maybe<Scalars['String']['output']>;
};

export type ChangeAutoFollowInput = {
    active?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    minSpend?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeChatterTrackingInput = {
    fansChatted?: InputMaybe<Scalars['Int']['input']>;
    msgsSent?: InputMaybe<Scalars['Int']['input']>;
    ppvsSent?: InputMaybe<Scalars['Int']['input']>;
    ppvsUnlocked?: InputMaybe<Scalars['Int']['input']>;
    sales?: InputMaybe<Scalars['Int']['input']>;
    teamMemberId: Scalars['ID']['input'];
};

export type ChangeCreatorAuthInput = {
    cookie?: InputMaybe<Scalars['String']['input']>;
    expiredAt?: InputMaybe<Scalars['Date']['input']>;
    user_agent?: InputMaybe<Scalars['String']['input']>;
    user_id: Scalars['String']['input'];
    x_bc?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeDisplayColorInput = {
    color: Scalars['String']['input'];
    id: Scalars['ID']['input'];
    inboxColor: Scalars['String']['input'];
    spend: Scalars['Int']['input'];
};

export type ChangeDisplaySettingsInput = {
    audioId: Scalars['Int']['input'];
    audioVolume: Scalars['Int']['input'];
    emojiStatus: Scalars['Boolean']['input'];
    emojis?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

export type ChangeExpiringFansInput = {
    active?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    messageTiming?: InputMaybe<Scalars['Int']['input']>;
    spendingLimitation?: InputMaybe<Scalars['Boolean']['input']>;
    spendingLimitationSum?: InputMaybe<Scalars['Int']['input']>;
    timeLimitation?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeExpiringFansMessageInput = {
    fallbackName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeFanNumberingInput = {
    active?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    numbers?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeFanSpendListsInput = {
    creatorId: Scalars['ID']['input'];
    id: Scalars['ID']['input'];
    includeExpired: Scalars['Boolean']['input'];
    maxSpend: Scalars['Int']['input'];
    minSpend: Scalars['Int']['input'];
    name: Scalars['String']['input'];
};

export type ChangeMassMessageInput = {
    fallbackName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeMassMessagingInput = {
    activeSub?: InputMaybe<Scalars['Boolean']['input']>;
    endDate?: InputMaybe<Scalars['Date']['input']>;
    excludeFans?: InputMaybe<Scalars['Int']['input']>;
    id: Scalars['ID']['input'];
    neverChatBefore?: InputMaybe<Scalars['Boolean']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
    status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangeNewSubsListInput = {
    creatorId: Scalars['String']['input'];
    listId: Scalars['String']['input'];
};

export type ChangePpvFollowInput = {
    active?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    include?: InputMaybe<Scalars['Boolean']['input']>;
    time?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangePpvMessageInput = {
    fallbackName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangePromotionReactivatorInput = {
    active?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    period?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeTaskInput = {
    endDate?: InputMaybe<Scalars['Date']['input']>;
    note?: InputMaybe<Scalars['String']['input']>;
    performerIds: Array<Scalars['String']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
    status?: InputMaybe<TaskStatusType>;
    taskIds: Array<Scalars['String']['input']>;
    title?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeTaskStatusInput = {
    status: TaskStatusType;
    taskId: Scalars['String']['input'];
    teamId: Scalars['String']['input'];
};

export type ChangeTeamInput = {
    logoUrl?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeTeamMemberInput = {
    name?: InputMaybe<Scalars['String']['input']>;
    note?: InputMaybe<Scalars['String']['input']>;
    permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
    teamMemberId: Scalars['String']['input'];
};

export type ChangeUserInput = {
    avatarUrl?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeWelcomeMessageInput = {
    fallbackName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeWelcomeSettingsInput = {
    active?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['ID']['input'];
    time?: InputMaybe<Scalars['Int']['input']>;
};

export type ChartsByType = {
    date: Scalars['Date']['output'];
    messages: Scalars['Int']['output'];
    posts: Scalars['Int']['output'];
    referrals: Scalars['Int']['output'];
    streams: Scalars['Int']['output'];
    subscription: Scalars['Int']['output'];
    tips: Scalars['Int']['output'];
};

export type ChatterDetailed = {
    activeTime?: Maybe<Scalars['Int']['output']>;
    avgResponse?: Maybe<Scalars['Int']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    inActiveTime?: Maybe<Scalars['Int']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    sentMessages?: Maybe<Scalars['Int']['output']>;
    totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type ChatterShort = {
    name?: Maybe<Scalars['String']['output']>;
    received?: Maybe<Scalars['Float']['output']>;
};

export type ChatterTeamMember = {
    avatarUrl?: Maybe<Scalars['String']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    online?: Maybe<Scalars['String']['output']>;
};

export type ChatterTracking = {
    createdAt: Scalars['Date']['output'];
    fansChatted?: Maybe<Scalars['Int']['output']>;
    id: Scalars['ID']['output'];
    msgsSent?: Maybe<Scalars['Int']['output']>;
    ppvsSent?: Maybe<Scalars['Int']['output']>;
    ppvsUnlocked?: Maybe<Scalars['Int']['output']>;
    sales?: Maybe<Scalars['Int']['output']>;
    teamMemberId: Scalars['ID']['output'];
};

export type ChatterTrackingResponse = {
    avgFansChatted: Scalars['Int']['output'];
    statistic?: Maybe<Array<Maybe<OneChatterStatistic>>>;
    totalPPVsUnlocked: Scalars['Int']['output'];
    totalSales: Scalars['Int']['output'];
    unlockRate: Scalars['Int']['output'];
};

export type ChooseAutoProxyInput = {
    country: EnabledRegionProxy;
    creatorId: Scalars['String']['input'];
};

export type ChooseHttpProxyInput = {
    creatorId: Scalars['String']['input'];
    host: Scalars['String']['input'];
    password: Scalars['String']['input'];
    port: Scalars['String']['input'];
    userName: Scalars['String']['input'];
};

export type CollectionList = {
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
};

export type Composition = {
    amountStats?: Maybe<Array<Maybe<DateAndAmount>>>;
    type?: Maybe<Scalars['String']['output']>;
};

export type CountryMap = {
    count: Scalars['Int']['output'];
    country: EnabledRegionProxy;
};

export type CreateDisplayColorInput = {
    color: Scalars['String']['input'];
    displaySettings: Scalars['ID']['input'];
    inboxColor: Scalars['String']['input'];
    spend: Scalars['Int']['input'];
};

export type CreateExpiringFansMessageInput = {
    expiringFans: Scalars['ID']['input'];
    fallbackName: Scalars['String']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text: Scalars['String']['input'];
};

export type CreateFanSpendListsInput = {
    creatorId: Scalars['ID']['input'];
    includeExpired: Scalars['Boolean']['input'];
    maxSpend: Scalars['Int']['input'];
    minSpend: Scalars['Int']['input'];
    name: Scalars['String']['input'];
};

export type CreateMassMessageInput = {
    fallbackName: Scalars['String']['input'];
    massMess: Scalars['ID']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text: Scalars['String']['input'];
};

export type CreateMassMessageInputForMessaging = {
    fallbackName: Scalars['String']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text: Scalars['String']['input'];
};

export type CreateMassMessagingInput = {
    massMessaging: MassMessagingCreate;
    messages?: InputMaybe<
        Array<InputMaybe<CreateMassMessageInputForMessaging>>
    >;
};

export type CreateNewPasswordInput = {
    newPassword: Scalars['String']['input'];
    oldPassword: Scalars['String']['input'];
};

export type CreatePpvMessageInput = {
    creatorId: Scalars['ID']['input'];
    fallbackName: Scalars['String']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text: Scalars['String']['input'];
};

export type CreateScriptFolderInput = {
    creatorId: Scalars['ID']['input'];
    folderName: Scalars['String']['input'];
};

export type CreateScriptInput = {
    customName: NameEnum;
    fallbackName: Scalars['String']['input'];
    fanName: NameEnum;
    name: Scalars['String']['input'];
    scriptFolder: Scalars['ID']['input'];
    text: Scalars['String']['input'];
};

export type CreateTaskInput = {
    endDate: Scalars['Date']['input'];
    note?: InputMaybe<Scalars['String']['input']>;
    performerIds: Array<Scalars['String']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
    status?: InputMaybe<TaskStatusType>;
    title: Scalars['String']['input'];
};

export type CreateWelcomeMessageInput = {
    fallbackName: Scalars['String']['input'];
    media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    text: Scalars['String']['input'];
    welcomeSettings: Scalars['ID']['input'];
};

export type Creator = {
    appAuth?: Maybe<AppAuth>;
    avatarURL?: Maybe<Scalars['String']['output']>;
    collectionListId?: Maybe<Scalars['String']['output']>;
    creatorAuth: CreatorAuth;
    id: Scalars['ID']['output'];
    joinDate?: Maybe<Scalars['Date']['output']>;
    license?: Maybe<License>;
    link: Scalars['String']['output'];
    preferences?: Maybe<Array<Maybe<Preferences>>>;
    userId: Scalars['ID']['output'];
    userName?: Maybe<Scalars['String']['output']>;
};

export type CreatorAuth = {
    cookie?: Maybe<Scalars['String']['output']>;
    expiredAt?: Maybe<Scalars['Date']['output']>;
    user_agent?: Maybe<Scalars['String']['output']>;
    user_id: Scalars['String']['output'];
    x_bc?: Maybe<Scalars['String']['output']>;
};

export type CreatorAuthInput = {
    cookie: Scalars['String']['input'];
    user_agent: Scalars['String']['input'];
    user_id: Scalars['String']['input'];
    x_bc: Scalars['String']['input'];
};

export type CreatorDeleteResponse = {
    message?: Maybe<Scalars['String']['output']>;
};

export type CreatorForAddCreatorResponse = {
    avatarURL?: Maybe<Scalars['String']['output']>;
    creatorAuth?: Maybe<CreatorAuth>;
    id: Scalars['ID']['output'];
    joinDate?: Maybe<Scalars['Date']['output']>;
    license?: Maybe<License>;
    link: Scalars['String']['output'];
    proxy?: Maybe<ProxyForCreator>;
    userId: Scalars['ID']['output'];
    userName?: Maybe<Scalars['String']['output']>;
};

export type CreatorForUser = {
    appAuth?: Maybe<AppAuth>;
    avatarURL?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['String']['output']>;
    creatorAuth?: Maybe<CreatorAuth>;
    id?: Maybe<Scalars['ID']['output']>;
    joinDate?: Maybe<Scalars['Date']['output']>;
    license?: Maybe<License>;
    link?: Maybe<Scalars['String']['output']>;
    permissions?: Maybe<PermissionForUser>;
    proxy?: Maybe<Proxy>;
    updatedAt?: Maybe<Scalars['String']['output']>;
    userName?: Maybe<Scalars['String']['output']>;
};

export type CreatorResponse = {
    creator?: Maybe<Creator>;
    message?: Maybe<Scalars['String']['output']>;
};

export type CreatorWithProxy = {
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    license?: Maybe<License>;
    link: Scalars['String']['output'];
    name?: Maybe<Scalars['String']['output']>;
    photoUrl?: Maybe<Scalars['String']['output']>;
    proxy?: Maybe<Proxy>;
    updatedAt: Scalars['String']['output'];
    userId: Scalars['ID']['output'];
};

export type CreatorWithoutPreferences = {
    avatarURL?: Maybe<Scalars['String']['output']>;
    creatorAuth?: Maybe<CreatorAuth>;
    id: Scalars['ID']['output'];
    joinDate?: Maybe<Scalars['Date']['output']>;
    license?: Maybe<License>;
    link: Scalars['String']['output'];
    userId: Scalars['ID']['output'];
    userName?: Maybe<Scalars['String']['output']>;
};

export type DailyStats = {
    avgEarningFan: OneStat;
    fans: OneStat;
    newSubs: OneStat;
    revenue: OneStat;
};

export type DateAndAmount = {
    amount?: Maybe<Scalars['Float']['output']>;
    date?: Maybe<Scalars['Date']['output']>;
};

export type DateAndCount = {
    count: Scalars['Float']['output'];
    date: Scalars['Date']['output'];
};

export type DateNewExpired = {
    date: Scalars['Date']['output'];
    expired: Scalars['Int']['output'];
    new: Scalars['Int']['output'];
};

export type DatesFilterCreatorIdInput = {
    creatorId: Scalars['ID']['input'];
    endDate: Scalars['Date']['input'];
    startDate: Scalars['Date']['input'];
};

export type DatesFilterInput = {
    endDate: Scalars['Date']['input'];
    startDate: Scalars['Date']['input'];
};

export type DatesFilterManyCreatorIdsInput = {
    creatorIds: Array<Scalars['String']['input']>;
    endDate: Scalars['Date']['input'];
    startDate: Scalars['Date']['input'];
};

export type DetStatsResponse = {
    conversionRate?: Maybe<Scalars['Float']['output']>;
    date?: Maybe<Scalars['Date']['output']>;
    linkClicks?: Maybe<Scalars['Int']['output']>;
    messagesRevenue?: Maybe<Scalars['Float']['output']>;
    newSubs?: Maybe<Scalars['Int']['output']>;
    newSubsRevenue?: Maybe<Scalars['Float']['output']>;
    openChats?: Maybe<Scalars['Int']['output']>;
    recSubsRevenue?: Maybe<Scalars['Float']['output']>;
    sellingChats?: Maybe<Scalars['Int']['output']>;
    textingRation?: Maybe<Scalars['Float']['output']>;
    tipsRevenue?: Maybe<Scalars['Float']['output']>;
    totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type DisplayColor = {
    color: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    inboxColor: Scalars['String']['output'];
    spend: Scalars['Int']['output'];
};

export type DisplayColorResponse = {
    displayColor?: Maybe<DisplayColor>;
    message?: Maybe<Scalars['String']['output']>;
};

export type DisplaySettings = {
    audioId: Scalars['Int']['output'];
    audioVolume: Scalars['Int']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    emojiStatus: Scalars['Boolean']['output'];
    emojis?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
};

export type DisplaySettingsResponse = {
    displaySettings?: Maybe<DisplaySettings>;
    message?: Maybe<Scalars['String']['output']>;
};

export enum EnabledRegionProxy {
    Germany = 'Germany',
    Spain = 'Spain',
    Usa = 'USA',
}

export type ExpiringFans = {
    active: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    messageTiming: Scalars['Int']['output'];
    spendingLimitation: Scalars['Boolean']['output'];
    spendingLimitationSum: Scalars['Int']['output'];
    timeLimitation: Scalars['Int']['output'];
};

export type ExpiringFansMessage = {
    expiringFans: Scalars['ID']['output'];
    fallbackName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    text: Scalars['String']['output'];
};

export type ExpiringFansMessageResponse = {
    expiringFans?: Maybe<ExpiringFansMessage>;
    message?: Maybe<Scalars['String']['output']>;
};

export type ExpiringFansResponse = {
    expiringFans?: Maybe<ExpiringFans>;
    message?: Maybe<Scalars['String']['output']>;
};

export type ExtensionTokenResponse = {
    token?: Maybe<Scalars['String']['output']>;
    visibilitySettings?: Maybe<Visibility>;
};

export type FanNumbering = {
    active: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    numbers: Scalars['Int']['output'];
};

export type FanSpendLists = {
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    includeExpired: Scalars['Boolean']['output'];
    maxSpend: Scalars['Int']['output'];
    minSpend: Scalars['Int']['output'];
    name: Scalars['String']['output'];
};

export type GetChattersTrackingInput = {
    creatorId: Scalars['ID']['input'];
    endDate?: InputMaybe<Scalars['Date']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetCreatorStatisticResponse = {
    bestDay?: Maybe<Array<Maybe<Best>>>;
    bestHour?: Maybe<Array<Maybe<Best>>>;
    composition?: Maybe<Array<Maybe<Composition>>>;
    subscription?: Maybe<StatisticSection>;
    topFans?: Maybe<Array<Maybe<TopFan>>>;
    turnover?: Maybe<StatisticSection>;
};

export type GetDatesCreatorIdInput = {
    creatorId: Scalars['ID']['input'];
    endDate?: InputMaybe<Scalars['Date']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetMyTeamTasks = {
    endDate: Scalars['Date']['input'];
    ownerId: Scalars['String']['input'];
    startDate: Scalars['Date']['input'];
};

export type GetOfStatsResponse = {
    charts?: Maybe<Array<Maybe<ChartsByType>>>;
    numberOfCreators: Scalars['Int']['output'];
    refunded: Scalars['Int']['output'];
    totalCharts?: Maybe<TotalChart>;
};

export type GetOneChatterTrackingInput = {
    chatterId: Scalars['String']['input'];
    creatorId: Scalars['String']['input'];
    endDate?: InputMaybe<Scalars['Date']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetOverallStatisticResponse = {
    followers: StatisticFollowersWithPercent;
    incomeSources: IncomeSource;
    topFans: Array<TopFanOverview>;
    topModels: Array<TopModel>;
    totalEarningByQuantity: StatSectionPercentsWithMax;
    totalEarnings: StatSectionPercentsWithMax;
};

export type GetOverallStatisticResponseOld = {
    id?: Maybe<Scalars['String']['output']>;
    incomeInfo?: Maybe<IncomeInfo>;
    totalNewSubs?: Maybe<StatisticSection>;
    totalPurchases?: Maybe<StatisticSection>;
    totalTurnover?: Maybe<StatisticSection>;
};

export type GetPpvTrackingInput = {
    creatorIds: Array<Scalars['String']['input']>;
    endDate: Scalars['Date']['input'];
    startDate: Scalars['Date']['input'];
};

export type GetPpvTrackingVaultInput = {
    creatorId: Scalars['String']['input'];
    vaultId: Scalars['String']['input'];
};

export type GetPpvTrackingVaultMessagesInput = {
    creatorId: Scalars['String']['input'];
    ppvId: Scalars['String']['input'];
    vaultId: Scalars['String']['input'];
};

export type GetPreferencesByChatterIdExtensionInput = {
    chatterId: Scalars['String']['input'];
    user_id: Scalars['String']['input'];
};

export type GetPreferencesByChatterIdExtensionResponse = {
    chatter?: Maybe<CreatorWithoutPreferences>;
    preferences?: Maybe<Array<Maybe<Preferences>>>;
};

export type GetScriptsByKeyLettersInput = {
    keyLetters: Scalars['String']['input'];
    user_id: Scalars['String']['input'];
};

export type GetUserByTokenResponse = {
    teams?: Maybe<Array<Maybe<TeamWithCreators>>>;
    token?: Maybe<Scalars['String']['output']>;
    user?: Maybe<UserDto>;
};

export type IncomeInfo = {
    messages?: Maybe<Scalars['Float']['output']>;
    subscription?: Maybe<Scalars['Float']['output']>;
    tips?: Maybe<Scalars['Float']['output']>;
};

export type IncomeSource = {
    messages: TotalAndPercent;
    posts: TotalAndPercent;
    referrals: TotalAndPercent;
    streams: TotalAndPercent;
    subscriptions: TotalAndPercent;
    tips: TotalAndPercent;
};

export type Keystrokes = {
    chart?: Maybe<Array<Maybe<SentKeystrokesChart>>>;
    count?: Maybe<Scalars['Int']['output']>;
};

export type License = {
    customerId?: Maybe<Scalars['String']['output']>;
    endDate?: Maybe<Scalars['Date']['output']>;
    startDate?: Maybe<Scalars['Date']['output']>;
    status?: Maybe<Scalars['Boolean']['output']>;
    subscriptionId?: Maybe<Scalars['String']['output']>;
};

export type LoginExtensionInput = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
    user_id: Scalars['String']['input'];
};

export type LoginExtensionResponse = {
    teamMemberId?: Maybe<Scalars['String']['output']>;
    token?: Maybe<Scalars['String']['output']>;
    visibilitySettings?: Maybe<Visibility>;
};

export type LoginInput = {
    login: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type MassMessaging = {
    activeSub: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    endDate?: Maybe<Scalars['Date']['output']>;
    excludeFans: Scalars['Int']['output'];
    id: Scalars['ID']['output'];
    neverChatBefore: Scalars['Boolean']['output'];
    sentTo?: Maybe<Scalars['Int']['output']>;
    startDate?: Maybe<Scalars['Date']['output']>;
    status: Scalars['Boolean']['output'];
};

export type MassMessagingCreate = {
    activeSub?: InputMaybe<Scalars['Boolean']['input']>;
    creatorId: Scalars['ID']['input'];
    endDate?: InputMaybe<Scalars['Date']['input']>;
    excludeFans?: InputMaybe<Scalars['Int']['input']>;
    neverChatBefore?: InputMaybe<Scalars['Boolean']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
    status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MassMessagingMessage = {
    fallbackName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    massMess: Scalars['ID']['output'];
    media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    text: Scalars['String']['output'];
};

export type MassMessagingMessageForMessaging = {
    fallbackName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    text: Scalars['String']['output'];
};

export type MassMessagingMessageResponse = {
    massMessage?: Maybe<MassMessagingMessage>;
    message?: Maybe<Scalars['String']['output']>;
};

export type MassMessagingResponse = {
    massMessaging?: Maybe<MassMessaging>;
    message?: Maybe<Scalars['String']['output']>;
};

export type MassMessagingWithMessages = {
    activeSub: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    endDate?: Maybe<Scalars['Date']['output']>;
    excludeFans: Scalars['Int']['output'];
    id: Scalars['ID']['output'];
    massMessages?: Maybe<Array<Maybe<MassMessagingMessageForMessaging>>>;
    neverChatBefore: Scalars['Boolean']['output'];
    sentTo?: Maybe<Scalars['Int']['output']>;
    startDate?: Maybe<Scalars['Date']['output']>;
    status: Scalars['Boolean']['output'];
};

export type MassMessagingWithMessagesResponse = {
    massMessaging?: Maybe<MassMessagingWithMessages>;
    message?: Maybe<Scalars['String']['output']>;
};

export enum MemberRoleSchema {
    Member = 'Member',
    Owner = 'Owner',
}

export type Mutation = {
    acceptTeamMember: TeamMemberResponse;
    addAUTOProxy?: Maybe<ChooseProxyResponse>;
    addCreator?: Maybe<AddCreatorResponse>;
    addCreatorExtension?: Maybe<LoginExtensionResponse>;
    addPreferences?: Maybe<PreferencesForChatterId>;
    addTeamMember: TeamMemberWithEmails;
    addVaultMediaExtension?: Maybe<AddVaultMediaResponse>;
    changeAppAuthExtension?: Maybe<Scalars['String']['output']>;
    changeAutoFollow?: Maybe<AutoFollow>;
    changeChatterTrackingApp?: Maybe<ChatterTracking>;
    changeCreatorAuth?: Maybe<Scalars['String']['output']>;
    changeCreatorAuthByExtension?: Maybe<Scalars['String']['output']>;
    changeCreatorVisibility?: Maybe<VisibilityChangeResponse>;
    changeDisplayColor?: Maybe<DisplayColorResponse>;
    changeDisplaySettings?: Maybe<DisplaySettingsResponse>;
    changeExpiringFans?: Maybe<ExpiringFansResponse>;
    changeExpiringFansMessage?: Maybe<ExpiringFansMessageResponse>;
    changeFanNumbering?: Maybe<FanNumbering>;
    changeFanSpendLists?: Maybe<FanSpendLists>;
    changeLastOnlineExtension?: Maybe<TeamMemberForResp>;
    changeMassMessage?: Maybe<MassMessagingMessageResponse>;
    changeMassMessaging?: Maybe<MassMessagingResponse>;
    changeNewSubsList?: Maybe<Creator>;
    changePPVFollow?: Maybe<ChangePpvFollow>;
    changePPVMessage?: Maybe<PpvMessageResponse>;
    changePassword: Scalars['String']['output'];
    changePromotionReactivator?: Maybe<PromotionReactivator>;
    changeScript?: Maybe<ScriptResponse>;
    changeScriptFolder?: Maybe<ScriptFolderResponse>;
    changeTask?: Maybe<Array<Maybe<Task>>>;
    changeTaskStatus?: Maybe<Task>;
    changeTeam?: Maybe<Team>;
    changeTeamMember: TeamMemberWithEmails;
    changeUser?: Maybe<UserDto>;
    changeWelcomeMessage?: Maybe<WelcomeMessageResponse>;
    changeWelcomeSettings?: Maybe<WelcomeSettingsResponse>;
    checkProxyIp?: Maybe<Scalars['String']['output']>;
    chooseAUTOProxy?: Maybe<ChooseProxyResponse>;
    chooseHTTPProxy?: Maybe<ChooseProxyResponse>;
    createDisplayColor?: Maybe<DisplayColorResponse>;
    createExpiringFansMessage?: Maybe<ExpiringFansMessageResponse>;
    createFanSpendLists?: Maybe<FanSpendLists>;
    createMassMessage?: Maybe<MassMessagingMessageResponse>;
    createMassMessaging?: Maybe<MassMessagingWithMessagesResponse>;
    createNewPassword: UserDto;
    createPPVMessage?: Maybe<PpvMessageResponse>;
    createScript?: Maybe<ScriptResponse>;
    createScriptFolder?: Maybe<ScriptFolderResponse>;
    createTask?: Maybe<Array<Maybe<Task>>>;
    createWelcomeMessage?: Maybe<WelcomeMessageResponse>;
    deleteAUTOProxy?: Maybe<Scalars['String']['output']>;
    deleteCreator?: Maybe<CreatorDeleteResponse>;
    deleteDisplayColor?: Maybe<Scalars['String']['output']>;
    deleteExpiringFansMessage?: Maybe<Scalars['String']['output']>;
    deleteFanSpendLists?: Maybe<Scalars['String']['output']>;
    deleteMassMessage?: Maybe<Scalars['String']['output']>;
    deletePPVMessage?: Maybe<Scalars['String']['output']>;
    deleteScript?: Maybe<Scalars['String']['output']>;
    deleteScriptFolder?: Maybe<Scalars['String']['output']>;
    deleteTask?: Maybe<Scalars['String']['output']>;
    deleteTeamMember: Scalars['String']['output'];
    deleteWelcomeMessage?: Maybe<Scalars['String']['output']>;
    duplicateMassMessaging?: Maybe<MassMessagingResponse>;
    forgotPassword: Scalars['String']['output'];
    getBillingPortal?: Maybe<Scalars['String']['output']>;
    login: RegisterOrLoginResponse;
    loginExtension?: Maybe<LoginExtensionResponse>;
    paymentCheckout?: Maybe<PaymentUrl>;
    register: RegisterOrLoginResponse;
    sessionGenerateQrcode: QrcodeResponse;
    sessionScanQrcode: ScanResponse;
    temporarySendWelcomeMessage?: Maybe<Scalars['String']['output']>;
};

export type MutationAcceptTeamMemberArgs = {
    memberToken?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAddAutoProxyArgs = {
    country: EnabledRegionProxy;
};

export type MutationAddCreatorArgs = {
    link?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAddCreatorExtensionArgs = {
    input?: InputMaybe<AddCreatorExtensionInput>;
};

export type MutationAddPreferencesArgs = {
    input?: InputMaybe<AddPreferencesInput>;
};

export type MutationAddTeamMemberArgs = {
    input?: InputMaybe<AddTeamMemberInput>;
};

export type MutationAddVaultMediaExtensionArgs = {
    input?: InputMaybe<VaultMediaExtInput>;
};

export type MutationChangeAppAuthExtensionArgs = {
    input?: InputMaybe<AppDataExtInput>;
};

export type MutationChangeAutoFollowArgs = {
    input?: InputMaybe<ChangeAutoFollowInput>;
};

export type MutationChangeChatterTrackingAppArgs = {
    input?: InputMaybe<ChangeChatterTrackingInput>;
};

export type MutationChangeCreatorAuthArgs = {
    input?: InputMaybe<ChangeCreatorAuthInput>;
};

export type MutationChangeCreatorAuthByExtensionArgs = {
    input?: InputMaybe<ChangeCreatorAuthInput>;
};

export type MutationChangeCreatorVisibilityArgs = {
    input?: InputMaybe<VisibilityInput>;
};

export type MutationChangeDisplayColorArgs = {
    input: ChangeDisplayColorInput;
};

export type MutationChangeDisplaySettingsArgs = {
    input?: InputMaybe<ChangeDisplaySettingsInput>;
};

export type MutationChangeExpiringFansArgs = {
    input?: InputMaybe<ChangeExpiringFansInput>;
};

export type MutationChangeExpiringFansMessageArgs = {
    input: ChangeExpiringFansMessageInput;
};

export type MutationChangeFanNumberingArgs = {
    input?: InputMaybe<ChangeFanNumberingInput>;
};

export type MutationChangeFanSpendListsArgs = {
    input?: InputMaybe<ChangeFanSpendListsInput>;
};

export type MutationChangeLastOnlineExtensionArgs = {
    teamMemberId: Scalars['String']['input'];
};

export type MutationChangeMassMessageArgs = {
    input?: InputMaybe<ChangeMassMessageInput>;
};

export type MutationChangeMassMessagingArgs = {
    input?: InputMaybe<ChangeMassMessagingInput>;
};

export type MutationChangeNewSubsListArgs = {
    input?: InputMaybe<ChangeNewSubsListInput>;
};

export type MutationChangePpvFollowArgs = {
    input?: InputMaybe<ChangePpvFollowInput>;
};

export type MutationChangePpvMessageArgs = {
    input?: InputMaybe<ChangePpvMessageInput>;
};

export type MutationChangePasswordArgs = {
    input: ChangePasswordInput;
};

export type MutationChangePromotionReactivatorArgs = {
    input?: InputMaybe<ChangePromotionReactivatorInput>;
};

export type MutationChangeScriptArgs = {
    input?: InputMaybe<UpdateScriptInput>;
};

export type MutationChangeScriptFolderArgs = {
    input?: InputMaybe<UpdateScriptFolderInput>;
};

export type MutationChangeTaskArgs = {
    input?: InputMaybe<ChangeTaskInput>;
};

export type MutationChangeTaskStatusArgs = {
    input?: InputMaybe<ChangeTaskStatusInput>;
};

export type MutationChangeTeamArgs = {
    input?: InputMaybe<ChangeTeamInput>;
};

export type MutationChangeTeamMemberArgs = {
    input?: InputMaybe<ChangeTeamMemberInput>;
};

export type MutationChangeUserArgs = {
    input?: InputMaybe<ChangeUserInput>;
};

export type MutationChangeWelcomeMessageArgs = {
    input: ChangeWelcomeMessageInput;
};

export type MutationChangeWelcomeSettingsArgs = {
    input?: InputMaybe<ChangeWelcomeSettingsInput>;
};

export type MutationCheckProxyIpArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationChooseAutoProxyArgs = {
    input?: InputMaybe<ChooseAutoProxyInput>;
};

export type MutationChooseHttpProxyArgs = {
    input?: InputMaybe<ChooseHttpProxyInput>;
};

export type MutationCreateDisplayColorArgs = {
    input: CreateDisplayColorInput;
};

export type MutationCreateExpiringFansMessageArgs = {
    input: CreateExpiringFansMessageInput;
};

export type MutationCreateFanSpendListsArgs = {
    input?: InputMaybe<CreateFanSpendListsInput>;
};

export type MutationCreateMassMessageArgs = {
    input?: InputMaybe<CreateMassMessageInput>;
};

export type MutationCreateMassMessagingArgs = {
    input?: InputMaybe<CreateMassMessagingInput>;
};

export type MutationCreateNewPasswordArgs = {
    input?: InputMaybe<CreateNewPasswordInput>;
};

export type MutationCreatePpvMessageArgs = {
    input?: InputMaybe<CreatePpvMessageInput>;
};

export type MutationCreateScriptArgs = {
    input?: InputMaybe<CreateScriptInput>;
};

export type MutationCreateScriptFolderArgs = {
    input?: InputMaybe<CreateScriptFolderInput>;
};

export type MutationCreateTaskArgs = {
    input?: InputMaybe<CreateTaskInput>;
};

export type MutationCreateWelcomeMessageArgs = {
    input: CreateWelcomeMessageInput;
};

export type MutationDeleteAutoProxyArgs = {
    proxyId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteCreatorArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteDisplayColorArgs = {
    displayColorId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteExpiringFansMessageArgs = {
    expiringFansMessageId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteFanSpendListsArgs = {
    id?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteMassMessageArgs = {
    massMessageId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeletePpvMessageArgs = {
    pPVMessageId: Scalars['String']['input'];
};

export type MutationDeleteScriptArgs = {
    id: Scalars['String']['input'];
};

export type MutationDeleteScriptFolderArgs = {
    id?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteTaskArgs = {
    taskIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MutationDeleteTeamMemberArgs = {
    teamMemberId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteWelcomeMessageArgs = {
    welcomeMessageId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDuplicateMassMessagingArgs = {
    massMessagingId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationForgotPasswordArgs = {
    login: Scalars['String']['input'];
};

export type MutationGetBillingPortalArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationLoginArgs = {
    input?: InputMaybe<LoginInput>;
};

export type MutationLoginExtensionArgs = {
    input: LoginExtensionInput;
};

export type MutationPaymentCheckoutArgs = {
    input?: InputMaybe<PaymentCheckoutInput>;
};

export type MutationRegisterArgs = {
    input?: InputMaybe<RegisterUserInput>;
};

export type MutationSessionScanQrcodeArgs = {
    input?: InputMaybe<ScanQrcodeInput>;
};

export type MutationTemporarySendWelcomeMessageArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type MyTeamPopulated = {
    members?: Maybe<Array<Maybe<TeamMemberWithEmails>>>;
    team?: Maybe<TeamResponse>;
};

export enum NameEnum {
    Lower = 'LOWER',
    Proper = 'PROPER',
    Upper = 'UPPER',
}

export type NewSubListsResponse = {
    collectionListId?: Maybe<Scalars['String']['output']>;
    collectionLists?: Maybe<Array<Maybe<CollectionList>>>;
};

export type OfDetStat = {
    creatorId: Scalars['ID']['output'];
    creatorName: Scalars['String']['output'];
    expired: Scalars['Int']['output'];
    messages: Scalars['Int']['output'];
    newActiveFans: Scalars['Int']['output'];
    newSubs: Scalars['Int']['output'];
    referrals: Scalars['Int']['output'];
    renews: Scalars['Int']['output'];
    subscription: Scalars['Int']['output'];
    tips: Scalars['Int']['output'];
    totalActiveFans: Scalars['Int']['output'];
    totalEarning: Scalars['Int']['output'];
};

export type OldChatterTracking = {
    chatterTable?: Maybe<Array<Maybe<ChatterDetailed>>>;
    revenueChart?: Maybe<Array<Maybe<RevenueChart>>>;
    topChattersChart?: Maybe<Array<Maybe<ChatterShort>>>;
};

export type OldRegisterOrLoginResponse = {
    creators?: Maybe<Array<Maybe<CreatorForUser>>>;
    message: Scalars['String']['output'];
    token: Scalars['String']['output'];
    user?: Maybe<UserDto>;
};

export type OneChatterInfo = {
    conversionRate?: Maybe<Scalars['Int']['output']>;
    date?: Maybe<Scalars['Date']['output']>;
    keystrokes?: Maybe<Keystrokes>;
    linkClicks?: Maybe<Scalars['Int']['output']>;
    messagesRevenue?: Maybe<Scalars['Float']['output']>;
    newSubs?: Maybe<Scalars['Int']['output']>;
    newSubsRevenue?: Maybe<Scalars['Float']['output']>;
    onlineTime?: Maybe<OnlineTime>;
    openChats?: Maybe<Scalars['Int']['output']>;
    ppvPurchaseRate?: Maybe<PpvPurchaseRate>;
    recSubsRevenue?: Maybe<Scalars['Float']['output']>;
    sellingChats?: Maybe<Scalars['Int']['output']>;
    sentMessages?: Maybe<SentMessages>;
    textingRation?: Maybe<Scalars['Int']['output']>;
    tipsRevenue?: Maybe<Scalars['Float']['output']>;
    totalRevenue?: Maybe<Scalars['Float']['output']>;
    totalSales?: Maybe<TotalSales>;
};

export type OneChatterStatistic = {
    fansChatted: Scalars['Int']['output'];
    goldenRatio: Scalars['Float']['output'];
    msgsSent: Scalars['Int']['output'];
    ppvsSent: Scalars['Int']['output'];
    ppvsUnlocked: Scalars['Int']['output'];
    sales: Scalars['Int']['output'];
    teamMember: ChatterTeamMember;
};

export type OneStat = {
    percent: Scalars['Int']['output'];
    today: Scalars['Int']['output'];
    yesterday: Scalars['Int']['output'];
};

export type OnlineTime = {
    activeTime?: Maybe<Scalars['Int']['output']>;
    inActiveTime?: Maybe<Scalars['Int']['output']>;
    onlineTime?: Maybe<Scalars['Int']['output']>;
};

export type OverallDailyStats = {
    actual24hStats: DailyStats;
    previous24hTurnover: StatSectionPercents;
};

export type OverallDetCompResponse = {
    creatorId: Scalars['String']['output'];
    creatorName: Scalars['String']['output'];
    messagesRevenue?: Maybe<Scalars['Float']['output']>;
    newSubs?: Maybe<Scalars['Int']['output']>;
    newSubsRevenue?: Maybe<Scalars['Float']['output']>;
    openChats?: Maybe<Scalars['Float']['output']>;
    sellingChats?: Maybe<Scalars['Float']['output']>;
    textingRation?: Maybe<Scalars['Float']['output']>;
    tipsRevenue?: Maybe<Scalars['Float']['output']>;
    totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type PpvFollow = {
    active: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    include: Scalars['Boolean']['output'];
    time: Scalars['Int']['output'];
};

export type PpvMessage = {
    creatorId: Scalars['ID']['output'];
    fallbackName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    text: Scalars['String']['output'];
};

export type PpvMessageResponse = {
    message?: Maybe<Scalars['String']['output']>;
    pPVMessage?: Maybe<PpvMessage>;
};

export type PpvTrackingStatistic = {
    conversion: Scalars['Int']['output'];
    id: Scalars['String']['output'];
    lastSale?: Maybe<Scalars['Date']['output']>;
    name: Scalars['String']['output'];
    qtyPictures: Scalars['Int']['output'];
    qtyVideos: Scalars['Int']['output'];
    revenue: Scalars['Int']['output'];
};

export type PaymentCheckoutInput = {
    creatorId: Scalars['ID']['input'];
    priceId: Scalars['String']['input'];
};

export type PaymentPortalInput = {
    sessionId: Scalars['String']['input'];
};

export type PaymentUrl = {
    checkoutSessionId?: Maybe<Scalars['String']['output']>;
    redirectUrl?: Maybe<Scalars['String']['output']>;
};

export type PerformerTask = {
    endDate: Scalars['Date']['output'];
    id?: Maybe<Scalars['ID']['output']>;
    note?: Maybe<Scalars['String']['output']>;
    ownerId: Scalars['String']['output'];
    performer: PerformerWithoutPerms;
    startDate: Scalars['Date']['output'];
    status: Scalars['String']['output'];
    title: Scalars['String']['output'];
};

export type PerformerWithoutPerms = {
    active: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    memberName: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    role?: Maybe<MemberRoleSchema>;
    teamId: Scalars['ID']['output'];
    userId: Scalars['ID']['output'];
};

export type PermissionForUser = {
    modifyCreatorSettings: Scalars['Boolean']['output'];
    seeCreatorStats: Scalars['Boolean']['output'];
    seeTracking: Scalars['Boolean']['output'];
    setupMessagesFunctions: Scalars['Boolean']['output'];
    startOFProfile: Scalars['Boolean']['output'];
};

export type PermissionInput = {
    creatorId: Scalars['ID']['input'];
    modifyCreatorSettings?: InputMaybe<Scalars['Boolean']['input']>;
    seeCreatorStats?: InputMaybe<Scalars['Boolean']['input']>;
    seeTracking?: InputMaybe<Scalars['Boolean']['input']>;
    setupMessagesFunctions?: InputMaybe<Scalars['Boolean']['input']>;
    startOFProfile?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Permissions = {
    creatorId: Scalars['ID']['output'];
    modifyCreatorSettings: Scalars['Boolean']['output'];
    seeCreatorStats: Scalars['Boolean']['output'];
    seeTracking: Scalars['Boolean']['output'];
    setupMessagesFunctions: Scalars['Boolean']['output'];
    startOFProfile: Scalars['Boolean']['output'];
};

export type PpvPurchaseRate = {
    chart?: Maybe<Array<Maybe<PpvPurchaseRateChart>>>;
    percent?: Maybe<Scalars['Int']['output']>;
};

export type PpvTrackingMessage = {
    messageId?: Maybe<Scalars['String']['output']>;
    price?: Maybe<Scalars['Float']['output']>;
    purchased?: Maybe<Scalars['Boolean']['output']>;
    sender?: Maybe<Scalars['String']['output']>;
    sentAt?: Maybe<Scalars['Date']['output']>;
    text?: Maybe<Scalars['String']['output']>;
};

export type PpvTrackingResponse = {
    purchaseRate: Scalars['Int']['output'];
    purchases: Scalars['Int']['output'];
    revenue: Scalars['Int']['output'];
    statistic?: Maybe<Array<Maybe<PpvTrackingStatistic>>>;
};

export type PpvTrackingVaultMessagesResponse = {
    avgNetPrice?: Maybe<Scalars['Float']['output']>;
    bought?: Maybe<Scalars['Int']['output']>;
    message?: Maybe<PpvTrackingMessage>;
    netRevenue?: Maybe<Scalars['Float']['output']>;
    purchaseRate?: Maybe<Scalars['Int']['output']>;
    sent?: Maybe<Scalars['Int']['output']>;
};

export type PpvTrackingVaultResponse = {
    name?: Maybe<Scalars['String']['output']>;
    ppvMessages?: Maybe<Array<Maybe<PpvVaultMessage>>>;
    purchaseRate?: Maybe<Scalars['Int']['output']>;
    purchases?: Maybe<Scalars['Int']['output']>;
    revenue?: Maybe<Scalars['Float']['output']>;
};

export type PpvVaultMessage = {
    avgNetPrice?: Maybe<Scalars['Float']['output']>;
    bought?: Maybe<Scalars['Int']['output']>;
    createdAt?: Maybe<Scalars['Date']['output']>;
    netRevenue?: Maybe<Scalars['Float']['output']>;
    ppvId: Scalars['String']['output'];
    purchaseRate?: Maybe<Scalars['Int']['output']>;
    sent?: Maybe<Scalars['Int']['output']>;
    text?: Maybe<Scalars['String']['output']>;
};

export type Preferences = {
    subscriberId: Scalars['String']['output'];
    text: Scalars['String']['output'];
};

export type PreferencesForChatterId = {
    message?: Maybe<Scalars['String']['output']>;
    preferences?: Maybe<Array<Maybe<Preferences>>>;
};

export type PromotionReactivator = {
    active: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    period: Scalars['Int']['output'];
};

export type Proxy = {
    creatorId?: Maybe<Scalars['ID']['output']>;
    host?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    password?: Maybe<Scalars['String']['output']>;
    port?: Maybe<Scalars['String']['output']>;
    proxyType: ProxyType;
    userName?: Maybe<Scalars['String']['output']>;
    zone?: Maybe<ProxyZone>;
};

export type ProxyForCreator = {
    country?: Maybe<Scalars['String']['output']>;
    host?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    password?: Maybe<Scalars['String']['output']>;
    port?: Maybe<Scalars['String']['output']>;
    proxyType: ProxyType;
    userName?: Maybe<Scalars['String']['output']>;
};

export enum ProxyType {
    Auto = 'AUTO',
    Http = 'HTTP',
}

export type ProxyZone = {
    country?: Maybe<EnabledRegionProxy>;
    number?: Maybe<Scalars['String']['output']>;
};

export type PublicData = {
    _id?: Maybe<Scalars['String']['output']>;
    avatarURL?: Maybe<Scalars['String']['output']>;
    joinDate?: Maybe<Scalars['String']['output']>;
    userName?: Maybe<Scalars['String']['output']>;
};

export type QrcodeResponse = {
    message?: Maybe<Scalars['String']['output']>;
    qrCodeUrl?: Maybe<Scalars['String']['output']>;
};

export type Query = {
    getAllCreatorVaultMedia?: Maybe<Array<Maybe<VaultMedia>>>;
    getAllCreatorVaultMediaExtension?: Maybe<Array<Maybe<VaultMedia>>>;
    getAllDisplayColors?: Maybe<Array<Maybe<DisplayColor>>>;
    getAllDisplayColorsExtension?: Maybe<Array<Maybe<DisplayColor>>>;
    getAllExpiringFansMessages?: Maybe<Array<Maybe<ExpiringFansMessage>>>;
    getAllMassMessaging?: Maybe<Array<Maybe<MassMessagingWithMessages>>>;
    getAllMessages?: Maybe<Array<Maybe<MassMessagingMessage>>>;
    getAllPPVMessage?: Maybe<Array<Maybe<PpvMessage>>>;
    getAllPerformers?: Maybe<Array<Maybe<PerformerWithoutPerms>>>;
    getAllScriptsExtension?: Maybe<Array<Maybe<ScriptExtension>>>;
    getAllTasksOwner?: Maybe<Array<Maybe<Task>>>;
    getAllWelcomeMessage?: Maybe<Array<Maybe<WelcomeMessage>>>;
    getAppExtensionData?: Maybe<LoginExtensionResponse>;
    getAutoFollow?: Maybe<AutoFollow>;
    getAvailableCountries?: Maybe<Array<Maybe<CountryMap>>>;
    getChatterTracking?: Maybe<ChatterTrackingResponse>;
    getChatterTrackingApp?: Maybe<ChatterTracking>;
    getCreatorAuth?: Maybe<CreatorAuth>;
    getCreatorById?: Maybe<Creator>;
    getCreatorFanSpendLists?: Maybe<Array<Maybe<FanSpendLists>>>;
    getCreatorProxy?: Maybe<Proxy>;
    getCreatorProxyExtension?: Maybe<Proxy>;
    getCreatorScriptFolders?: Maybe<Array<Maybe<ScriptFoldersWithScripts>>>;
    getCreatorStatisticOLD?: Maybe<GetCreatorStatisticResponse>;
    getCreatorVisibility?: Maybe<VisibilityChangeResponse>;
    getDetailedStatisticOLD?: Maybe<Array<Maybe<DetStatsResponse>>>;
    getDisplaySettings?: Maybe<DisplaySettings>;
    getDisplaySettingsExtension?: Maybe<DisplaySettings>;
    getExpiringFans?: Maybe<ExpiringFans>;
    getExtensionTokenThrowToken?: Maybe<ExtensionTokenResponse>;
    getFanNumbering?: Maybe<FanNumbering>;
    getFanSpendListsById?: Maybe<FanSpendLists>;
    getMyTasks?: Maybe<Array<Maybe<PerformerTask>>>;
    getMyTeam?: Maybe<MyTeamPopulated>;
    getMyTeamMembers?: Maybe<Array<Maybe<TeamMemberWithEmails>>>;
    getMyTeamTasks?: Maybe<Array<Maybe<PerformerTask>>>;
    getNewSubsLists?: Maybe<NewSubListsResponse>;
    getOFDetailedStats?: Maybe<Array<Maybe<OfDetStat>>>;
    getOFStats?: Maybe<GetOfStatsResponse>;
    getOldChattersTracking?: Maybe<OldChatterTracking>;
    getOneChatterTracking?: Maybe<OneChatterInfo>;
    getOneDisplayColor?: Maybe<DisplayColor>;
    getOneExpiringFansMessage?: Maybe<ExpiringFansMessage>;
    getOneMassMessage?: Maybe<MassMessagingMessage>;
    getOneMassMessaging?: Maybe<MassMessaging>;
    getOnePPVMessage?: Maybe<PpvMessage>;
    getOneWelcomeMessage?: Maybe<WelcomeMessage>;
    getOverallDailyStats?: Maybe<OverallDailyStats>;
    getOverallDetailedComparison?: Maybe<Array<Maybe<OverallDetCompResponse>>>;
    getOverallStatistic?: Maybe<GetOverallStatisticResponse>;
    getOverallStatisticOLD?: Maybe<GetOverallStatisticResponseOld>;
    getPPVFollow?: Maybe<PpvFollow>;
    getPPVTracking?: Maybe<PpvTrackingResponse>;
    getPPVTrackingVault?: Maybe<PpvTrackingVaultResponse>;
    getPPVTrackingVaultMessages?: Maybe<PpvTrackingVaultMessagesResponse>;
    getPreferencesByChatterIdExtension?: Maybe<GetPreferencesByChatterIdExtensionResponse>;
    getPromotionReactivator?: Maybe<PromotionReactivator>;
    getPublicDataFromLink?: Maybe<PublicData>;
    getScriptById?: Maybe<Script>;
    getScriptFolderById?: Maybe<ScriptFolder>;
    getScriptsByKeyLettersExtension?: Maybe<Array<Maybe<Script>>>;
    getUserByToken?: Maybe<GetUserByTokenResponse>;
    getUserCreatorsProxy?: Maybe<Array<Maybe<CreatorWithProxy>>>;
    getVisibilitySettingByTokenExtension?: Maybe<VisibilitySettingByExtension>;
    getWelcomeSettings?: Maybe<WelcomeSettings>;
    updateCreatorsStats?: Maybe<Scalars['String']['output']>;
};

export type QueryGetAllCreatorVaultMediaArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllCreatorVaultMediaExtensionArgs = {
    user_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllDisplayColorsArgs = {
    creatorId: Scalars['String']['input'];
};

export type QueryGetAllDisplayColorsExtensionArgs = {
    user_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllExpiringFansMessagesArgs = {
    creatorId: Scalars['String']['input'];
};

export type QueryGetAllMassMessagingArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllMessagesArgs = {
    massMessId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllPpvMessageArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllScriptsExtensionArgs = {
    user_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllTasksOwnerArgs = {
    input?: InputMaybe<DatesFilterInput>;
};

export type QueryGetAllWelcomeMessageArgs = {
    creatorId: Scalars['String']['input'];
};

export type QueryGetAppExtensionDataArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAutoFollowArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetChatterTrackingArgs = {
    input?: InputMaybe<DatesFilterInput>;
};

export type QueryGetChatterTrackingAppArgs = {
    teamMemberId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCreatorAuthArgs = {
    user_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCreatorByIdArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCreatorFanSpendListsArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCreatorProxyArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCreatorProxyExtensionArgs = {
    user_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCreatorScriptFoldersArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCreatorStatisticOldArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetCreatorVisibilityArgs = {
    creatorId: Scalars['String']['input'];
};

export type QueryGetDetailedStatisticOldArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetDisplaySettingsArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetDisplaySettingsExtensionArgs = {
    user_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetExpiringFansArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetExtensionTokenThrowTokenArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetFanNumberingArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetFanSpendListsByIdArgs = {
    id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetMyTasksArgs = {
    input?: InputMaybe<DatesFilterInput>;
};

export type QueryGetMyTeamTasksArgs = {
    input?: InputMaybe<GetMyTeamTasks>;
};

export type QueryGetNewSubsListsArgs = {
    creatorId: Scalars['String']['input'];
};

export type QueryGetOfDetailedStatsArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetOfStatsArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetOldChattersTrackingArgs = {
    input?: InputMaybe<GetDatesCreatorIdInput>;
};

export type QueryGetOneChatterTrackingArgs = {
    input?: InputMaybe<GetOneChatterTrackingInput>;
};

export type QueryGetOneDisplayColorArgs = {
    displayColorId: Scalars['String']['input'];
};

export type QueryGetOneExpiringFansMessageArgs = {
    expiringFansMessageId: Scalars['String']['input'];
};

export type QueryGetOneMassMessageArgs = {
    massMessageId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetOneMassMessagingArgs = {
    massMessagingId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetOnePpvMessageArgs = {
    pPVMessageId: Scalars['String']['input'];
};

export type QueryGetOneWelcomeMessageArgs = {
    welcomeMessageId: Scalars['String']['input'];
};

export type QueryGetOverallDailyStatsArgs = {
    creatorIds: Array<Scalars['String']['input']>;
};

export type QueryGetOverallDetailedComparisonArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetOverallStatisticArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetOverallStatisticOldArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetPpvFollowArgs = {
    creatorId: Scalars['String']['input'];
};

export type QueryGetPpvTrackingArgs = {
    input?: InputMaybe<DatesFilterManyCreatorIdsInput>;
};

export type QueryGetPpvTrackingVaultArgs = {
    input?: InputMaybe<GetPpvTrackingVaultInput>;
};

export type QueryGetPpvTrackingVaultMessagesArgs = {
    input?: InputMaybe<GetPpvTrackingVaultMessagesInput>;
};

export type QueryGetPreferencesByChatterIdExtensionArgs = {
    input?: InputMaybe<GetPreferencesByChatterIdExtensionInput>;
};

export type QueryGetPromotionReactivatorArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetPublicDataFromLinkArgs = {
    link: Scalars['String']['input'];
};

export type QueryGetScriptByIdArgs = {
    id: Scalars['String']['input'];
};

export type QueryGetScriptFolderByIdArgs = {
    id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetScriptsByKeyLettersExtensionArgs = {
    input?: InputMaybe<GetScriptsByKeyLettersInput>;
};

export type QueryGetVisibilitySettingByTokenExtensionArgs = {
    user_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetWelcomeSettingsArgs = {
    creatorId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryUpdateCreatorsStatsArgs = {
    creatorIds: Array<Scalars['String']['input']>;
};

export type ReceivedHistory = {
    date?: Maybe<Scalars['Date']['output']>;
    received?: Maybe<Scalars['Float']['output']>;
};

export type RegisterOrLoginResponse = {
    message: Scalars['String']['output'];
    teams?: Maybe<Array<Maybe<TeamWithCreators>>>;
    token: Scalars['String']['output'];
    user?: Maybe<UserDto>;
};

export type RegisterUserInput = {
    email: Scalars['String']['input'];
    fullName: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type ResetPassword = {
    expire?: Maybe<Scalars['String']['output']>;
    resetCode?: Maybe<Scalars['Int']['output']>;
};

export type RevenueChart = {
    name?: Maybe<Scalars['String']['output']>;
    receivedHistory?: Maybe<Array<Maybe<ReceivedHistory>>>;
};

export type ScanQrcodeInput = {
    code: Scalars['String']['input'];
    userId: Scalars['ID']['input'];
};

export type ScanResponse = {
    message?: Maybe<Scalars['String']['output']>;
    user?: Maybe<UserDto>;
};

export type Script = {
    customName: NameEnum;
    fallbackName: Scalars['String']['output'];
    fanName: NameEnum;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    number: Scalars['Int']['output'];
    scriptFolder: Scalars['ID']['output'];
    text: Scalars['String']['output'];
};

export type ScriptExtension = {
    name: Scalars['String']['output'];
    scriptId: Scalars['String']['output'];
};

export type ScriptFolder = {
    creatorId: Scalars['ID']['output'];
    folderName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    number: Scalars['Int']['output'];
};

export type ScriptFolderResponse = {
    message: Scalars['String']['output'];
    scriptFolder?: Maybe<ScriptFolder>;
};

export type ScriptFolderWithScript = {
    creatorId: Scalars['ID']['output'];
    folderName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    number: Scalars['Int']['output'];
    scripts?: Maybe<Array<Maybe<ScriptForFolder>>>;
};

export type ScriptFoldersWithScripts = {
    scriptFolders?: Maybe<ScriptFolderWithScript>;
};

export type ScriptForFolder = {
    fallbackName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    number: Scalars['Int']['output'];
    text: Scalars['String']['output'];
};

export type ScriptResponse = {
    message?: Maybe<Scalars['String']['output']>;
    script?: Maybe<Script>;
};

export type SentMessages = {
    chart?: Maybe<Array<Maybe<SentMessagesChart>>>;
    count?: Maybe<Scalars['Int']['output']>;
};

export type StatSectionPercents = {
    chart: Array<DateAndAmount>;
    percent: Scalars['Int']['output'];
    total: Scalars['Int']['output'];
};

export type StatSectionPercentsWithMax = {
    chart: Array<DateAndAmount>;
    maxValue: Scalars['Int']['output'];
    totalAndPercent: TotalAndPercent;
};

export type StatisticFollowersWithPercent = {
    chart: Array<DateNewExpired>;
    maxValue: Scalars['Int']['output'];
    totalAndPercent: TotalAndPercent;
};

export type StatisticSection = {
    chart: Array<DateAndCount>;
    total: Scalars['Float']['output'];
};

export type Task = {
    endDate: Scalars['Date']['output'];
    id: Scalars['ID']['output'];
    note?: Maybe<Scalars['String']['output']>;
    ownerId: Scalars['ID']['output'];
    performer: PerformerWithoutPerms;
    startDate: Scalars['Date']['output'];
    status?: Maybe<TaskStatusType>;
    title: Scalars['String']['output'];
};

export enum TaskStatusType {
    Completed = 'Completed',
    InProgress = 'InProgress',
    NotCompleted = 'NotCompleted',
}

export type Team = {
    creatorIds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
    id: Scalars['ID']['output'];
    logoUrl?: Maybe<Scalars['String']['output']>;
    ownerId: Scalars['ID']['output'];
    teamMemberIds: Array<Scalars['ID']['output']>;
    teamName: Scalars['String']['output'];
};

export type TeamMember = {
    acceptLink?: Maybe<AcceptLink>;
    active: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    lastOnlineAt?: Maybe<Scalars['Date']['output']>;
    memberName: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    permissions?: Maybe<Array<Maybe<Permissions>>>;
    role?: Maybe<MemberRoleSchema>;
    teamId: Scalars['ID']['output'];
    userId: Scalars['ID']['output'];
};

export type TeamMemberForResp = {
    active: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    lastOnlineAt?: Maybe<Scalars['Date']['output']>;
    memberName: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    permissions?: Maybe<Array<Maybe<Permissions>>>;
    role?: Maybe<MemberRoleSchema>;
    teamId: Scalars['ID']['output'];
    userId: Scalars['ID']['output'];
};

export type TeamMemberResponse = {
    message: Scalars['String']['output'];
    teamMember: TeamMemberForResp;
};

export type TeamMemberWithEmails = {
    active: Scalars['Boolean']['output'];
    email: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    lastOnlineAt?: Maybe<Scalars['Date']['output']>;
    memberName: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    permissions?: Maybe<Array<Maybe<Permissions>>>;
    role?: Maybe<MemberRoleSchema>;
    teamId: Scalars['ID']['output'];
    userId: Scalars['ID']['output'];
};

export type TeamResponse = {
    id: Scalars['ID']['output'];
    logoUrl?: Maybe<Scalars['String']['output']>;
    ownerId: Scalars['ID']['output'];
    teamName: Scalars['String']['output'];
};

export type TeamWithCreators = {
    creators?: Maybe<Array<Maybe<CreatorForUser>>>;
    id: Scalars['ID']['output'];
    logoUrl?: Maybe<Scalars['String']['output']>;
    ownerId: Scalars['ID']['output'];
    teamMemberIds: Array<Scalars['ID']['output']>;
    teamName: Scalars['String']['output'];
};

export type TopFan = {
    avatarUrl?: Maybe<Scalars['String']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    total?: Maybe<Scalars['Float']['output']>;
    userName?: Maybe<Scalars['String']['output']>;
};

export type TopFanOverview = {
    avatarUrl: Scalars['String']['output'];
    name: Scalars['String']['output'];
    revenueByPeriod: Scalars['Int']['output'];
    totalRevenue: Scalars['Int']['output'];
};

export type TopModel = {
    avatarUrl: Scalars['String']['output'];
    name: Scalars['String']['output'];
    revenueByPeriod: Scalars['Int']['output'];
};

export type TotalAndPercent = {
    percent: Scalars['Int']['output'];
    total: Scalars['Int']['output'];
};

export type TotalChart = {
    messages: Scalars['Float']['output'];
    posts: Scalars['Float']['output'];
    referrals: Scalars['Float']['output'];
    streams: Scalars['Float']['output'];
    subscription: Scalars['Float']['output'];
    tips: Scalars['Float']['output'];
    total: Scalars['Float']['output'];
};

export type TotalSales = {
    chart?: Maybe<Array<Maybe<TotalSalesChart>>>;
    total?: Maybe<Scalars['Int']['output']>;
};

export type UpdateScriptFolderInput = {
    creatorId: Scalars['ID']['input'];
    folderName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

export type UpdateScriptInput = {
    customName?: InputMaybe<NameEnum>;
    fallbackName?: InputMaybe<Scalars['String']['input']>;
    fanName?: InputMaybe<NameEnum>;
    id: Scalars['ID']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
    scriptFolder?: InputMaybe<Scalars['ID']['input']>;
    text?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
    avatarUrl?: Maybe<Scalars['String']['output']>;
    email: Scalars['String']['output'];
    fullName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    isTwoFactorEnabled?: Maybe<Scalars['Boolean']['output']>;
    lastActivity?: Maybe<Scalars['Date']['output']>;
    passwordHash: Scalars['String']['output'];
    resetPassword?: Maybe<ResetPassword>;
    role?: Maybe<UserRole>;
};

export type UserDto = {
    avatarUrl?: Maybe<Scalars['String']['output']>;
    email: Scalars['String']['output'];
    fullName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    isTwoFactorEnabled?: Maybe<Scalars['Boolean']['output']>;
    lastActivity?: Maybe<Scalars['Date']['output']>;
    role?: Maybe<UserRole>;
};

export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
}

export type VaultMedia = {
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    fileName?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['ID']['output']>;
    media_id: Scalars['String']['output'];
    price?: Maybe<Scalars['String']['output']>;
    scriptId?: Maybe<Scalars['ID']['output']>;
};

export type VaultMediaExtInput = {
    fileName: Scalars['String']['input'];
    media_id: Scalars['String']['input'];
    price: Scalars['Float']['input'];
    scriptId?: InputMaybe<Scalars['String']['input']>;
    user_id: Scalars['String']['input'];
};

export type Visibility = {
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    showFanDetails?: Maybe<Scalars['Boolean']['output']>;
    showFanSpending?: Maybe<Scalars['Boolean']['output']>;
    showGlobalInfo?: Maybe<Scalars['Boolean']['output']>;
    showScripts?: Maybe<Scalars['Boolean']['output']>;
};

export type VisibilityChangeResponse = {
    message?: Maybe<Scalars['String']['output']>;
    visibility?: Maybe<Visibility>;
};

export type VisibilityInput = {
    creatorId?: InputMaybe<Scalars['ID']['input']>;
    id?: InputMaybe<Scalars['ID']['input']>;
    showFanDetails?: InputMaybe<Scalars['Boolean']['input']>;
    showFanSpending?: InputMaybe<Scalars['Boolean']['input']>;
    showGlobalInfo?: InputMaybe<Scalars['Boolean']['input']>;
    showScripts?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VisibilitySettingByExtension = {
    user_id?: Maybe<Scalars['String']['output']>;
    visibilitySetting?: Maybe<Visibility>;
};

export type WelcomeMessage = {
    fallbackName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    text: Scalars['String']['output'];
    welcomeSettings: Scalars['ID']['output'];
};

export type WelcomeMessageResponse = {
    message?: Maybe<Scalars['String']['output']>;
    welcomeMessage?: Maybe<WelcomeMessage>;
};

export type WelcomeSettings = {
    active: Scalars['Boolean']['output'];
    createdBy: Scalars['ID']['output'];
    creatorId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    time: Scalars['Int']['output'];
};

export type WelcomeSettingsResponse = {
    message?: Maybe<Scalars['String']['output']>;
    welcomeSettings?: Maybe<WelcomeSettings>;
};

export type ChangePpvFollow = {
    message?: Maybe<Scalars['String']['output']>;
    pPVFollow?: Maybe<PpvFollow>;
};

export type ChangePasswordInput = {
    login: Scalars['String']['input'];
    newPassword: Scalars['String']['input'];
    resetCode: Scalars['Int']['input'];
};

export type ChooseProxyResponse = {
    message?: Maybe<Scalars['String']['output']>;
    proxy?: Maybe<Proxy>;
};

export type PpvPurchaseRateChart = {
    boughtPPV?: Maybe<Scalars['Int']['output']>;
    date?: Maybe<Scalars['Date']['output']>;
    sendPPV?: Maybe<Scalars['Int']['output']>;
};

export type SentKeystrokesChart = {
    count?: Maybe<Scalars['Int']['output']>;
    date?: Maybe<Scalars['Date']['output']>;
};

export type SentMessagesChart = {
    count?: Maybe<Scalars['Int']['output']>;
    date?: Maybe<Scalars['Date']['output']>;
};

export type TotalSalesChart = {
    date?: Maybe<Scalars['String']['output']>;
    ppvRevenue?: Maybe<Scalars['Int']['output']>;
    tipsRevenue?: Maybe<Scalars['Int']['output']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {},
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {},
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    AcceptLink: ResolverTypeWrapper<AcceptLink>;
    AddCreatorExtensionInput: AddCreatorExtensionInput;
    AddCreatorResponse: ResolverTypeWrapper<AddCreatorResponse>;
    AddPreferencesInput: AddPreferencesInput;
    AddTeamMemberInput: AddTeamMemberInput;
    AddVaultMediaResponse: ResolverTypeWrapper<AddVaultMediaResponse>;
    AppAuth: ResolverTypeWrapper<AppAuth>;
    AppDataExtInput: AppDataExtInput;
    AutoFollow: ResolverTypeWrapper<AutoFollow>;
    Best: ResolverTypeWrapper<Best>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    ChangeAutoFollowInput: ChangeAutoFollowInput;
    ChangeChatterTrackingInput: ChangeChatterTrackingInput;
    ChangeCreatorAuthInput: ChangeCreatorAuthInput;
    ChangeDisplayColorInput: ChangeDisplayColorInput;
    ChangeDisplaySettingsInput: ChangeDisplaySettingsInput;
    ChangeExpiringFansInput: ChangeExpiringFansInput;
    ChangeExpiringFansMessageInput: ChangeExpiringFansMessageInput;
    ChangeFanNumberingInput: ChangeFanNumberingInput;
    ChangeFanSpendListsInput: ChangeFanSpendListsInput;
    ChangeMassMessageInput: ChangeMassMessageInput;
    ChangeMassMessagingInput: ChangeMassMessagingInput;
    ChangeNewSubsListInput: ChangeNewSubsListInput;
    ChangePPVFollowInput: ChangePpvFollowInput;
    ChangePPVMessageInput: ChangePpvMessageInput;
    ChangePromotionReactivatorInput: ChangePromotionReactivatorInput;
    ChangeTaskInput: ChangeTaskInput;
    ChangeTaskStatusInput: ChangeTaskStatusInput;
    ChangeTeamInput: ChangeTeamInput;
    ChangeTeamMemberInput: ChangeTeamMemberInput;
    ChangeUserInput: ChangeUserInput;
    ChangeWelcomeMessageInput: ChangeWelcomeMessageInput;
    ChangeWelcomeSettingsInput: ChangeWelcomeSettingsInput;
    ChartsByType: ResolverTypeWrapper<ChartsByType>;
    ChatterDetailed: ResolverTypeWrapper<ChatterDetailed>;
    ChatterShort: ResolverTypeWrapper<ChatterShort>;
    ChatterTeamMember: ResolverTypeWrapper<ChatterTeamMember>;
    ChatterTracking: ResolverTypeWrapper<ChatterTracking>;
    ChatterTrackingResponse: ResolverTypeWrapper<ChatterTrackingResponse>;
    ChooseAUTOProxyInput: ChooseAutoProxyInput;
    ChooseHTTPProxyInput: ChooseHttpProxyInput;
    CollectionList: ResolverTypeWrapper<CollectionList>;
    Composition: ResolverTypeWrapper<Composition>;
    CountryMap: ResolverTypeWrapper<CountryMap>;
    CreateDisplayColorInput: CreateDisplayColorInput;
    CreateExpiringFansMessageInput: CreateExpiringFansMessageInput;
    CreateFanSpendListsInput: CreateFanSpendListsInput;
    CreateMassMessageInput: CreateMassMessageInput;
    CreateMassMessageInputForMessaging: CreateMassMessageInputForMessaging;
    CreateMassMessagingInput: CreateMassMessagingInput;
    CreateNewPasswordInput: CreateNewPasswordInput;
    CreatePPVMessageInput: CreatePpvMessageInput;
    CreateScriptFolderInput: CreateScriptFolderInput;
    CreateScriptInput: CreateScriptInput;
    CreateTaskInput: CreateTaskInput;
    CreateWelcomeMessageInput: CreateWelcomeMessageInput;
    Creator: ResolverTypeWrapper<Creator>;
    CreatorAuth: ResolverTypeWrapper<CreatorAuth>;
    CreatorAuthInput: CreatorAuthInput;
    CreatorDeleteResponse: ResolverTypeWrapper<CreatorDeleteResponse>;
    CreatorForAddCreatorResponse: ResolverTypeWrapper<CreatorForAddCreatorResponse>;
    CreatorForUser: ResolverTypeWrapper<CreatorForUser>;
    CreatorResponse: ResolverTypeWrapper<CreatorResponse>;
    CreatorWithProxy: ResolverTypeWrapper<CreatorWithProxy>;
    CreatorWithoutPreferences: ResolverTypeWrapper<CreatorWithoutPreferences>;
    DailyStats: ResolverTypeWrapper<DailyStats>;
    Date: ResolverTypeWrapper<Scalars['Date']['output']>;
    DateAndAmount: ResolverTypeWrapper<DateAndAmount>;
    DateAndCount: ResolverTypeWrapper<DateAndCount>;
    DateNewExpired: ResolverTypeWrapper<DateNewExpired>;
    DatesFilterCreatorIdInput: DatesFilterCreatorIdInput;
    DatesFilterInput: DatesFilterInput;
    DatesFilterManyCreatorIdsInput: DatesFilterManyCreatorIdsInput;
    DetStatsResponse: ResolverTypeWrapper<DetStatsResponse>;
    DisplayColor: ResolverTypeWrapper<DisplayColor>;
    DisplayColorResponse: ResolverTypeWrapper<DisplayColorResponse>;
    DisplaySettings: ResolverTypeWrapper<DisplaySettings>;
    DisplaySettingsResponse: ResolverTypeWrapper<DisplaySettingsResponse>;
    EnabledRegionProxy: EnabledRegionProxy;
    ExpiringFans: ResolverTypeWrapper<ExpiringFans>;
    ExpiringFansMessage: ResolverTypeWrapper<ExpiringFansMessage>;
    ExpiringFansMessageResponse: ResolverTypeWrapper<ExpiringFansMessageResponse>;
    ExpiringFansResponse: ResolverTypeWrapper<ExpiringFansResponse>;
    ExtensionTokenResponse: ResolverTypeWrapper<ExtensionTokenResponse>;
    FanNumbering: ResolverTypeWrapper<FanNumbering>;
    FanSpendLists: ResolverTypeWrapper<FanSpendLists>;
    Float: ResolverTypeWrapper<Scalars['Float']['output']>;
    GetChattersTrackingInput: GetChattersTrackingInput;
    GetCreatorStatisticResponse: ResolverTypeWrapper<GetCreatorStatisticResponse>;
    GetDatesCreatorIdInput: GetDatesCreatorIdInput;
    GetMyTeamTasks: GetMyTeamTasks;
    GetOFStatsResponse: ResolverTypeWrapper<GetOfStatsResponse>;
    GetOneChatterTrackingInput: GetOneChatterTrackingInput;
    GetOverallStatisticResponse: ResolverTypeWrapper<GetOverallStatisticResponse>;
    GetOverallStatisticResponseOLD: ResolverTypeWrapper<GetOverallStatisticResponseOld>;
    GetPPVTrackingInput: GetPpvTrackingInput;
    GetPpvTrackingVaultInput: GetPpvTrackingVaultInput;
    GetPpvTrackingVaultMessagesInput: GetPpvTrackingVaultMessagesInput;
    GetPreferencesByChatterIdExtensionInput: GetPreferencesByChatterIdExtensionInput;
    GetPreferencesByChatterIdExtensionResponse: ResolverTypeWrapper<GetPreferencesByChatterIdExtensionResponse>;
    GetScriptsByKeyLettersInput: GetScriptsByKeyLettersInput;
    GetUserByTokenResponse: ResolverTypeWrapper<GetUserByTokenResponse>;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    IncomeInfo: ResolverTypeWrapper<IncomeInfo>;
    IncomeSource: ResolverTypeWrapper<IncomeSource>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    Keystrokes: ResolverTypeWrapper<Keystrokes>;
    License: ResolverTypeWrapper<License>;
    LoginExtensionInput: LoginExtensionInput;
    LoginExtensionResponse: ResolverTypeWrapper<LoginExtensionResponse>;
    LoginInput: LoginInput;
    MassMessaging: ResolverTypeWrapper<MassMessaging>;
    MassMessagingCreate: MassMessagingCreate;
    MassMessagingMessage: ResolverTypeWrapper<MassMessagingMessage>;
    MassMessagingMessageForMessaging: ResolverTypeWrapper<MassMessagingMessageForMessaging>;
    MassMessagingMessageResponse: ResolverTypeWrapper<MassMessagingMessageResponse>;
    MassMessagingResponse: ResolverTypeWrapper<MassMessagingResponse>;
    MassMessagingWithMessages: ResolverTypeWrapper<MassMessagingWithMessages>;
    MassMessagingWithMessagesResponse: ResolverTypeWrapper<MassMessagingWithMessagesResponse>;
    MemberRoleSchema: MemberRoleSchema;
    Mutation: ResolverTypeWrapper<{}>;
    MyTeamPopulated: ResolverTypeWrapper<MyTeamPopulated>;
    NameEnum: NameEnum;
    NewSubListsResponse: ResolverTypeWrapper<NewSubListsResponse>;
    OFDetStat: ResolverTypeWrapper<OfDetStat>;
    OldChatterTracking: ResolverTypeWrapper<OldChatterTracking>;
    OldRegisterOrLoginResponse: ResolverTypeWrapper<OldRegisterOrLoginResponse>;
    OneChatterInfo: ResolverTypeWrapper<OneChatterInfo>;
    OneChatterStatistic: ResolverTypeWrapper<OneChatterStatistic>;
    OneStat: ResolverTypeWrapper<OneStat>;
    OnlineTime: ResolverTypeWrapper<OnlineTime>;
    OverallDailyStats: ResolverTypeWrapper<OverallDailyStats>;
    OverallDetCompResponse: ResolverTypeWrapper<OverallDetCompResponse>;
    PPVFollow: ResolverTypeWrapper<PpvFollow>;
    PPVMessage: ResolverTypeWrapper<PpvMessage>;
    PPVMessageResponse: ResolverTypeWrapper<PpvMessageResponse>;
    PPVTrackingStatistic: ResolverTypeWrapper<PpvTrackingStatistic>;
    PaymentCheckoutInput: PaymentCheckoutInput;
    PaymentPortalInput: PaymentPortalInput;
    PaymentUrl: ResolverTypeWrapper<PaymentUrl>;
    PerformerTask: ResolverTypeWrapper<PerformerTask>;
    PerformerWithoutPerms: ResolverTypeWrapper<PerformerWithoutPerms>;
    PermissionForUser: ResolverTypeWrapper<PermissionForUser>;
    PermissionInput: PermissionInput;
    Permissions: ResolverTypeWrapper<Permissions>;
    PpvPurchaseRate: ResolverTypeWrapper<PpvPurchaseRate>;
    PpvTrackingMessage: ResolverTypeWrapper<PpvTrackingMessage>;
    PpvTrackingResponse: ResolverTypeWrapper<PpvTrackingResponse>;
    PpvTrackingVaultMessagesResponse: ResolverTypeWrapper<PpvTrackingVaultMessagesResponse>;
    PpvTrackingVaultResponse: ResolverTypeWrapper<PpvTrackingVaultResponse>;
    PpvVaultMessage: ResolverTypeWrapper<PpvVaultMessage>;
    Preferences: ResolverTypeWrapper<Preferences>;
    PreferencesForChatterId: ResolverTypeWrapper<PreferencesForChatterId>;
    PromotionReactivator: ResolverTypeWrapper<PromotionReactivator>;
    Proxy: ResolverTypeWrapper<Proxy>;
    ProxyForCreator: ResolverTypeWrapper<ProxyForCreator>;
    ProxyType: ProxyType;
    ProxyZone: ResolverTypeWrapper<ProxyZone>;
    PublicData: ResolverTypeWrapper<PublicData>;
    QrcodeResponse: ResolverTypeWrapper<QrcodeResponse>;
    Query: ResolverTypeWrapper<{}>;
    ReceivedHistory: ResolverTypeWrapper<ReceivedHistory>;
    RegisterOrLoginResponse: ResolverTypeWrapper<RegisterOrLoginResponse>;
    RegisterUserInput: RegisterUserInput;
    ResetPassword: ResolverTypeWrapper<ResetPassword>;
    RevenueChart: ResolverTypeWrapper<RevenueChart>;
    ScanQrcodeInput: ScanQrcodeInput;
    ScanResponse: ResolverTypeWrapper<ScanResponse>;
    Script: ResolverTypeWrapper<Script>;
    ScriptExtension: ResolverTypeWrapper<ScriptExtension>;
    ScriptFolder: ResolverTypeWrapper<ScriptFolder>;
    ScriptFolderResponse: ResolverTypeWrapper<ScriptFolderResponse>;
    ScriptFolderWithScript: ResolverTypeWrapper<ScriptFolderWithScript>;
    ScriptFoldersWithScripts: ResolverTypeWrapper<ScriptFoldersWithScripts>;
    ScriptForFolder: ResolverTypeWrapper<ScriptForFolder>;
    ScriptResponse: ResolverTypeWrapper<ScriptResponse>;
    SentMessages: ResolverTypeWrapper<SentMessages>;
    StatSectionPercents: ResolverTypeWrapper<StatSectionPercents>;
    StatSectionPercentsWithMax: ResolverTypeWrapper<StatSectionPercentsWithMax>;
    StatisticFollowersWithPercent: ResolverTypeWrapper<StatisticFollowersWithPercent>;
    StatisticSection: ResolverTypeWrapper<StatisticSection>;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    Task: ResolverTypeWrapper<Task>;
    TaskStatusType: TaskStatusType;
    Team: ResolverTypeWrapper<Team>;
    TeamMember: ResolverTypeWrapper<TeamMember>;
    TeamMemberForResp: ResolverTypeWrapper<TeamMemberForResp>;
    TeamMemberResponse: ResolverTypeWrapper<TeamMemberResponse>;
    TeamMemberWithEmails: ResolverTypeWrapper<TeamMemberWithEmails>;
    TeamResponse: ResolverTypeWrapper<TeamResponse>;
    TeamWithCreators: ResolverTypeWrapper<TeamWithCreators>;
    TopFan: ResolverTypeWrapper<TopFan>;
    TopFanOverview: ResolverTypeWrapper<TopFanOverview>;
    TopModel: ResolverTypeWrapper<TopModel>;
    TotalAndPercent: ResolverTypeWrapper<TotalAndPercent>;
    TotalChart: ResolverTypeWrapper<TotalChart>;
    TotalSales: ResolverTypeWrapper<TotalSales>;
    UpdateScriptFolderInput: UpdateScriptFolderInput;
    UpdateScriptInput: UpdateScriptInput;
    User: ResolverTypeWrapper<User>;
    UserDTO: ResolverTypeWrapper<UserDto>;
    UserRole: UserRole;
    VaultMedia: ResolverTypeWrapper<VaultMedia>;
    VaultMediaExtInput: VaultMediaExtInput;
    Visibility: ResolverTypeWrapper<Visibility>;
    VisibilityChangeResponse: ResolverTypeWrapper<VisibilityChangeResponse>;
    VisibilityInput: VisibilityInput;
    VisibilitySettingByExtension: ResolverTypeWrapper<VisibilitySettingByExtension>;
    WelcomeMessage: ResolverTypeWrapper<WelcomeMessage>;
    WelcomeMessageResponse: ResolverTypeWrapper<WelcomeMessageResponse>;
    WelcomeSettings: ResolverTypeWrapper<WelcomeSettings>;
    WelcomeSettingsResponse: ResolverTypeWrapper<WelcomeSettingsResponse>;
    changePPVFollow: ResolverTypeWrapper<ChangePpvFollow>;
    changePasswordInput: ChangePasswordInput;
    chooseProxyResponse: ResolverTypeWrapper<ChooseProxyResponse>;
    ppvPurchaseRateChart: ResolverTypeWrapper<PpvPurchaseRateChart>;
    sentKeystrokesChart: ResolverTypeWrapper<SentKeystrokesChart>;
    sentMessagesChart: ResolverTypeWrapper<SentMessagesChart>;
    totalSalesChart: ResolverTypeWrapper<TotalSalesChart>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    AcceptLink: AcceptLink;
    AddCreatorExtensionInput: AddCreatorExtensionInput;
    AddCreatorResponse: AddCreatorResponse;
    AddPreferencesInput: AddPreferencesInput;
    AddTeamMemberInput: AddTeamMemberInput;
    AddVaultMediaResponse: AddVaultMediaResponse;
    AppAuth: AppAuth;
    AppDataExtInput: AppDataExtInput;
    AutoFollow: AutoFollow;
    Best: Best;
    Boolean: Scalars['Boolean']['output'];
    ChangeAutoFollowInput: ChangeAutoFollowInput;
    ChangeChatterTrackingInput: ChangeChatterTrackingInput;
    ChangeCreatorAuthInput: ChangeCreatorAuthInput;
    ChangeDisplayColorInput: ChangeDisplayColorInput;
    ChangeDisplaySettingsInput: ChangeDisplaySettingsInput;
    ChangeExpiringFansInput: ChangeExpiringFansInput;
    ChangeExpiringFansMessageInput: ChangeExpiringFansMessageInput;
    ChangeFanNumberingInput: ChangeFanNumberingInput;
    ChangeFanSpendListsInput: ChangeFanSpendListsInput;
    ChangeMassMessageInput: ChangeMassMessageInput;
    ChangeMassMessagingInput: ChangeMassMessagingInput;
    ChangeNewSubsListInput: ChangeNewSubsListInput;
    ChangePPVFollowInput: ChangePpvFollowInput;
    ChangePPVMessageInput: ChangePpvMessageInput;
    ChangePromotionReactivatorInput: ChangePromotionReactivatorInput;
    ChangeTaskInput: ChangeTaskInput;
    ChangeTaskStatusInput: ChangeTaskStatusInput;
    ChangeTeamInput: ChangeTeamInput;
    ChangeTeamMemberInput: ChangeTeamMemberInput;
    ChangeUserInput: ChangeUserInput;
    ChangeWelcomeMessageInput: ChangeWelcomeMessageInput;
    ChangeWelcomeSettingsInput: ChangeWelcomeSettingsInput;
    ChartsByType: ChartsByType;
    ChatterDetailed: ChatterDetailed;
    ChatterShort: ChatterShort;
    ChatterTeamMember: ChatterTeamMember;
    ChatterTracking: ChatterTracking;
    ChatterTrackingResponse: ChatterTrackingResponse;
    ChooseAUTOProxyInput: ChooseAutoProxyInput;
    ChooseHTTPProxyInput: ChooseHttpProxyInput;
    CollectionList: CollectionList;
    Composition: Composition;
    CountryMap: CountryMap;
    CreateDisplayColorInput: CreateDisplayColorInput;
    CreateExpiringFansMessageInput: CreateExpiringFansMessageInput;
    CreateFanSpendListsInput: CreateFanSpendListsInput;
    CreateMassMessageInput: CreateMassMessageInput;
    CreateMassMessageInputForMessaging: CreateMassMessageInputForMessaging;
    CreateMassMessagingInput: CreateMassMessagingInput;
    CreateNewPasswordInput: CreateNewPasswordInput;
    CreatePPVMessageInput: CreatePpvMessageInput;
    CreateScriptFolderInput: CreateScriptFolderInput;
    CreateScriptInput: CreateScriptInput;
    CreateTaskInput: CreateTaskInput;
    CreateWelcomeMessageInput: CreateWelcomeMessageInput;
    Creator: Creator;
    CreatorAuth: CreatorAuth;
    CreatorAuthInput: CreatorAuthInput;
    CreatorDeleteResponse: CreatorDeleteResponse;
    CreatorForAddCreatorResponse: CreatorForAddCreatorResponse;
    CreatorForUser: CreatorForUser;
    CreatorResponse: CreatorResponse;
    CreatorWithProxy: CreatorWithProxy;
    CreatorWithoutPreferences: CreatorWithoutPreferences;
    DailyStats: DailyStats;
    Date: Scalars['Date']['output'];
    DateAndAmount: DateAndAmount;
    DateAndCount: DateAndCount;
    DateNewExpired: DateNewExpired;
    DatesFilterCreatorIdInput: DatesFilterCreatorIdInput;
    DatesFilterInput: DatesFilterInput;
    DatesFilterManyCreatorIdsInput: DatesFilterManyCreatorIdsInput;
    DetStatsResponse: DetStatsResponse;
    DisplayColor: DisplayColor;
    DisplayColorResponse: DisplayColorResponse;
    DisplaySettings: DisplaySettings;
    DisplaySettingsResponse: DisplaySettingsResponse;
    ExpiringFans: ExpiringFans;
    ExpiringFansMessage: ExpiringFansMessage;
    ExpiringFansMessageResponse: ExpiringFansMessageResponse;
    ExpiringFansResponse: ExpiringFansResponse;
    ExtensionTokenResponse: ExtensionTokenResponse;
    FanNumbering: FanNumbering;
    FanSpendLists: FanSpendLists;
    Float: Scalars['Float']['output'];
    GetChattersTrackingInput: GetChattersTrackingInput;
    GetCreatorStatisticResponse: GetCreatorStatisticResponse;
    GetDatesCreatorIdInput: GetDatesCreatorIdInput;
    GetMyTeamTasks: GetMyTeamTasks;
    GetOFStatsResponse: GetOfStatsResponse;
    GetOneChatterTrackingInput: GetOneChatterTrackingInput;
    GetOverallStatisticResponse: GetOverallStatisticResponse;
    GetOverallStatisticResponseOLD: GetOverallStatisticResponseOld;
    GetPPVTrackingInput: GetPpvTrackingInput;
    GetPpvTrackingVaultInput: GetPpvTrackingVaultInput;
    GetPpvTrackingVaultMessagesInput: GetPpvTrackingVaultMessagesInput;
    GetPreferencesByChatterIdExtensionInput: GetPreferencesByChatterIdExtensionInput;
    GetPreferencesByChatterIdExtensionResponse: GetPreferencesByChatterIdExtensionResponse;
    GetScriptsByKeyLettersInput: GetScriptsByKeyLettersInput;
    GetUserByTokenResponse: GetUserByTokenResponse;
    ID: Scalars['ID']['output'];
    IncomeInfo: IncomeInfo;
    IncomeSource: IncomeSource;
    Int: Scalars['Int']['output'];
    Keystrokes: Keystrokes;
    License: License;
    LoginExtensionInput: LoginExtensionInput;
    LoginExtensionResponse: LoginExtensionResponse;
    LoginInput: LoginInput;
    MassMessaging: MassMessaging;
    MassMessagingCreate: MassMessagingCreate;
    MassMessagingMessage: MassMessagingMessage;
    MassMessagingMessageForMessaging: MassMessagingMessageForMessaging;
    MassMessagingMessageResponse: MassMessagingMessageResponse;
    MassMessagingResponse: MassMessagingResponse;
    MassMessagingWithMessages: MassMessagingWithMessages;
    MassMessagingWithMessagesResponse: MassMessagingWithMessagesResponse;
    Mutation: {};
    MyTeamPopulated: MyTeamPopulated;
    NewSubListsResponse: NewSubListsResponse;
    OFDetStat: OfDetStat;
    OldChatterTracking: OldChatterTracking;
    OldRegisterOrLoginResponse: OldRegisterOrLoginResponse;
    OneChatterInfo: OneChatterInfo;
    OneChatterStatistic: OneChatterStatistic;
    OneStat: OneStat;
    OnlineTime: OnlineTime;
    OverallDailyStats: OverallDailyStats;
    OverallDetCompResponse: OverallDetCompResponse;
    PPVFollow: PpvFollow;
    PPVMessage: PpvMessage;
    PPVMessageResponse: PpvMessageResponse;
    PPVTrackingStatistic: PpvTrackingStatistic;
    PaymentCheckoutInput: PaymentCheckoutInput;
    PaymentPortalInput: PaymentPortalInput;
    PaymentUrl: PaymentUrl;
    PerformerTask: PerformerTask;
    PerformerWithoutPerms: PerformerWithoutPerms;
    PermissionForUser: PermissionForUser;
    PermissionInput: PermissionInput;
    Permissions: Permissions;
    PpvPurchaseRate: PpvPurchaseRate;
    PpvTrackingMessage: PpvTrackingMessage;
    PpvTrackingResponse: PpvTrackingResponse;
    PpvTrackingVaultMessagesResponse: PpvTrackingVaultMessagesResponse;
    PpvTrackingVaultResponse: PpvTrackingVaultResponse;
    PpvVaultMessage: PpvVaultMessage;
    Preferences: Preferences;
    PreferencesForChatterId: PreferencesForChatterId;
    PromotionReactivator: PromotionReactivator;
    Proxy: Proxy;
    ProxyForCreator: ProxyForCreator;
    ProxyZone: ProxyZone;
    PublicData: PublicData;
    QrcodeResponse: QrcodeResponse;
    Query: {};
    ReceivedHistory: ReceivedHistory;
    RegisterOrLoginResponse: RegisterOrLoginResponse;
    RegisterUserInput: RegisterUserInput;
    ResetPassword: ResetPassword;
    RevenueChart: RevenueChart;
    ScanQrcodeInput: ScanQrcodeInput;
    ScanResponse: ScanResponse;
    Script: Script;
    ScriptExtension: ScriptExtension;
    ScriptFolder: ScriptFolder;
    ScriptFolderResponse: ScriptFolderResponse;
    ScriptFolderWithScript: ScriptFolderWithScript;
    ScriptFoldersWithScripts: ScriptFoldersWithScripts;
    ScriptForFolder: ScriptForFolder;
    ScriptResponse: ScriptResponse;
    SentMessages: SentMessages;
    StatSectionPercents: StatSectionPercents;
    StatSectionPercentsWithMax: StatSectionPercentsWithMax;
    StatisticFollowersWithPercent: StatisticFollowersWithPercent;
    StatisticSection: StatisticSection;
    String: Scalars['String']['output'];
    Task: Task;
    Team: Team;
    TeamMember: TeamMember;
    TeamMemberForResp: TeamMemberForResp;
    TeamMemberResponse: TeamMemberResponse;
    TeamMemberWithEmails: TeamMemberWithEmails;
    TeamResponse: TeamResponse;
    TeamWithCreators: TeamWithCreators;
    TopFan: TopFan;
    TopFanOverview: TopFanOverview;
    TopModel: TopModel;
    TotalAndPercent: TotalAndPercent;
    TotalChart: TotalChart;
    TotalSales: TotalSales;
    UpdateScriptFolderInput: UpdateScriptFolderInput;
    UpdateScriptInput: UpdateScriptInput;
    User: User;
    UserDTO: UserDto;
    VaultMedia: VaultMedia;
    VaultMediaExtInput: VaultMediaExtInput;
    Visibility: Visibility;
    VisibilityChangeResponse: VisibilityChangeResponse;
    VisibilityInput: VisibilityInput;
    VisibilitySettingByExtension: VisibilitySettingByExtension;
    WelcomeMessage: WelcomeMessage;
    WelcomeMessageResponse: WelcomeMessageResponse;
    WelcomeSettings: WelcomeSettings;
    WelcomeSettingsResponse: WelcomeSettingsResponse;
    changePPVFollow: ChangePpvFollow;
    changePasswordInput: ChangePasswordInput;
    chooseProxyResponse: ChooseProxyResponse;
    ppvPurchaseRateChart: PpvPurchaseRateChart;
    sentKeystrokesChart: SentKeystrokesChart;
    sentMessagesChart: SentMessagesChart;
    totalSalesChart: TotalSalesChart;
};

export type AcceptLinkResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['AcceptLink'] = ResolversParentTypes['AcceptLink'],
> = {
    expire?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    memberToken?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddCreatorResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['AddCreatorResponse'] = ResolversParentTypes['AddCreatorResponse'],
> = {
    creator?: Resolver<
        Maybe<ResolversTypes['CreatorForAddCreatorResponse']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddVaultMediaResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['AddVaultMediaResponse'] = ResolversParentTypes['AddVaultMediaResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    vaultMedia?: Resolver<
        Maybe<ResolversTypes['VaultMedia']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppAuthResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['AppAuth'] = ResolversParentTypes['AppAuth'],
> = {
    bcTokenSha?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    sess?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AutoFollowResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['AutoFollow'] = ResolversParentTypes['AutoFollow'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    minSpend?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BestResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Best'] = ResolversParentTypes['Best'],
> = {
    average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChartsByTypeResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ChartsByType'] = ResolversParentTypes['ChartsByType'],
> = {
    date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    messages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    posts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    referrals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    streams?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    subscription?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    tips?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterDetailedResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ChatterDetailed'] = ResolversParentTypes['ChatterDetailed'],
> = {
    activeTime?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    avgResponse?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    inActiveTime?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    sentMessages?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    totalRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterShortResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ChatterShort'] = ResolversParentTypes['ChatterShort'],
> = {
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    received?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterTeamMemberResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ChatterTeamMember'] = ResolversParentTypes['ChatterTeamMember'],
> = {
    avatarUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    online?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterTrackingResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ChatterTracking'] = ResolversParentTypes['ChatterTracking'],
> = {
    createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    fansChatted?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    msgsSent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    ppvsSent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    ppvsUnlocked?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    sales?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    teamMemberId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterTrackingResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ChatterTrackingResponse'] = ResolversParentTypes['ChatterTrackingResponse'],
> = {
    avgFansChatted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    statistic?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['OneChatterStatistic']>>>,
        ParentType,
        ContextType
    >;
    totalPPVsUnlocked?: Resolver<
        ResolversTypes['Int'],
        ParentType,
        ContextType
    >;
    totalSales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    unlockRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionListResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CollectionList'] = ResolversParentTypes['CollectionList'],
> = {
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompositionResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Composition'] = ResolversParentTypes['Composition'],
> = {
    amountStats?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['DateAndAmount']>>>,
        ParentType,
        ContextType
    >;
    type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryMapResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CountryMap'] = ResolversParentTypes['CountryMap'],
> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    country?: Resolver<
        ResolversTypes['EnabledRegionProxy'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Creator'] = ResolversParentTypes['Creator'],
> = {
    appAuth?: Resolver<
        Maybe<ResolversTypes['AppAuth']>,
        ParentType,
        ContextType
    >;
    avatarURL?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    collectionListId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    creatorAuth?: Resolver<
        ResolversTypes['CreatorAuth'],
        ParentType,
        ContextType
    >;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    joinDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    license?: Resolver<
        Maybe<ResolversTypes['License']>,
        ParentType,
        ContextType
    >;
    link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    preferences?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Preferences']>>>,
        ParentType,
        ContextType
    >;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorAuthResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CreatorAuth'] = ResolversParentTypes['CreatorAuth'],
> = {
    cookie?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    expiredAt?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    user_agent?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    x_bc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorDeleteResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CreatorDeleteResponse'] = ResolversParentTypes['CreatorDeleteResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorForAddCreatorResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CreatorForAddCreatorResponse'] = ResolversParentTypes['CreatorForAddCreatorResponse'],
> = {
    avatarURL?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    creatorAuth?: Resolver<
        Maybe<ResolversTypes['CreatorAuth']>,
        ParentType,
        ContextType
    >;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    joinDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    license?: Resolver<
        Maybe<ResolversTypes['License']>,
        ParentType,
        ContextType
    >;
    link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    proxy?: Resolver<
        Maybe<ResolversTypes['ProxyForCreator']>,
        ParentType,
        ContextType
    >;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorForUserResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CreatorForUser'] = ResolversParentTypes['CreatorForUser'],
> = {
    appAuth?: Resolver<
        Maybe<ResolversTypes['AppAuth']>,
        ParentType,
        ContextType
    >;
    avatarURL?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    createdAt?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    creatorAuth?: Resolver<
        Maybe<ResolversTypes['CreatorAuth']>,
        ParentType,
        ContextType
    >;
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    joinDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    license?: Resolver<
        Maybe<ResolversTypes['License']>,
        ParentType,
        ContextType
    >;
    link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    permissions?: Resolver<
        Maybe<ResolversTypes['PermissionForUser']>,
        ParentType,
        ContextType
    >;
    proxy?: Resolver<Maybe<ResolversTypes['Proxy']>, ParentType, ContextType>;
    updatedAt?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CreatorResponse'] = ResolversParentTypes['CreatorResponse'],
> = {
    creator?: Resolver<
        Maybe<ResolversTypes['Creator']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorWithProxyResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CreatorWithProxy'] = ResolversParentTypes['CreatorWithProxy'],
> = {
    createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    license?: Resolver<
        Maybe<ResolversTypes['License']>,
        ParentType,
        ContextType
    >;
    link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    photoUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    proxy?: Resolver<Maybe<ResolversTypes['Proxy']>, ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorWithoutPreferencesResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['CreatorWithoutPreferences'] = ResolversParentTypes['CreatorWithoutPreferences'],
> = {
    avatarURL?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    creatorAuth?: Resolver<
        Maybe<ResolversTypes['CreatorAuth']>,
        ParentType,
        ContextType
    >;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    joinDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    license?: Resolver<
        Maybe<ResolversTypes['License']>,
        ParentType,
        ContextType
    >;
    link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyStatsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DailyStats'] = ResolversParentTypes['DailyStats'],
> = {
    avgEarningFan?: Resolver<
        ResolversTypes['OneStat'],
        ParentType,
        ContextType
    >;
    fans?: Resolver<ResolversTypes['OneStat'], ParentType, ContextType>;
    newSubs?: Resolver<ResolversTypes['OneStat'], ParentType, ContextType>;
    revenue?: Resolver<ResolversTypes['OneStat'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}

export type DateAndAmountResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DateAndAmount'] = ResolversParentTypes['DateAndAmount'],
> = {
    amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DateAndCountResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DateAndCount'] = ResolversParentTypes['DateAndCount'],
> = {
    count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DateNewExpiredResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DateNewExpired'] = ResolversParentTypes['DateNewExpired'],
> = {
    date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    expired?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    new?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DetStatsResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DetStatsResponse'] = ResolversParentTypes['DetStatsResponse'],
> = {
    conversionRate?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    linkClicks?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    messagesRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    newSubs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    newSubsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    openChats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    recSubsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    sellingChats?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    textingRation?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    tipsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    totalRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayColorResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DisplayColor'] = ResolversParentTypes['DisplayColor'],
> = {
    color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    inboxColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    spend?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayColorResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DisplayColorResponse'] = ResolversParentTypes['DisplayColorResponse'],
> = {
    displayColor?: Resolver<
        Maybe<ResolversTypes['DisplayColor']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplaySettingsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DisplaySettings'] = ResolversParentTypes['DisplaySettings'],
> = {
    audioId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    audioVolume?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    emojiStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    emojis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplaySettingsResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DisplaySettingsResponse'] = ResolversParentTypes['DisplaySettingsResponse'],
> = {
    displaySettings?: Resolver<
        Maybe<ResolversTypes['DisplaySettings']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ExpiringFans'] = ResolversParentTypes['ExpiringFans'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    messageTiming?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    spendingLimitation?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    spendingLimitationSum?: Resolver<
        ResolversTypes['Int'],
        ParentType,
        ContextType
    >;
    timeLimitation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansMessageResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ExpiringFansMessage'] = ResolversParentTypes['ExpiringFansMessage'],
> = {
    expiringFans?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    media?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['String']>>>,
        ParentType,
        ContextType
    >;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansMessageResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ExpiringFansMessageResponse'] = ResolversParentTypes['ExpiringFansMessageResponse'],
> = {
    expiringFans?: Resolver<
        Maybe<ResolversTypes['ExpiringFansMessage']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ExpiringFansResponse'] = ResolversParentTypes['ExpiringFansResponse'],
> = {
    expiringFans?: Resolver<
        Maybe<ResolversTypes['ExpiringFans']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExtensionTokenResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ExtensionTokenResponse'] = ResolversParentTypes['ExtensionTokenResponse'],
> = {
    token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    visibilitySettings?: Resolver<
        Maybe<ResolversTypes['Visibility']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FanNumberingResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['FanNumbering'] = ResolversParentTypes['FanNumbering'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    numbers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FanSpendListsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['FanSpendLists'] = ResolversParentTypes['FanSpendLists'],
> = {
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    includeExpired?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    maxSpend?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    minSpend?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetCreatorStatisticResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['GetCreatorStatisticResponse'] = ResolversParentTypes['GetCreatorStatisticResponse'],
> = {
    bestDay?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Best']>>>,
        ParentType,
        ContextType
    >;
    bestHour?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Best']>>>,
        ParentType,
        ContextType
    >;
    composition?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Composition']>>>,
        ParentType,
        ContextType
    >;
    subscription?: Resolver<
        Maybe<ResolversTypes['StatisticSection']>,
        ParentType,
        ContextType
    >;
    topFans?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['TopFan']>>>,
        ParentType,
        ContextType
    >;
    turnover?: Resolver<
        Maybe<ResolversTypes['StatisticSection']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetOfStatsResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['GetOFStatsResponse'] = ResolversParentTypes['GetOFStatsResponse'],
> = {
    charts?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ChartsByType']>>>,
        ParentType,
        ContextType
    >;
    numberOfCreators?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    refunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalCharts?: Resolver<
        Maybe<ResolversTypes['TotalChart']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetOverallStatisticResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['GetOverallStatisticResponse'] = ResolversParentTypes['GetOverallStatisticResponse'],
> = {
    followers?: Resolver<
        ResolversTypes['StatisticFollowersWithPercent'],
        ParentType,
        ContextType
    >;
    incomeSources?: Resolver<
        ResolversTypes['IncomeSource'],
        ParentType,
        ContextType
    >;
    topFans?: Resolver<
        Array<ResolversTypes['TopFanOverview']>,
        ParentType,
        ContextType
    >;
    topModels?: Resolver<
        Array<ResolversTypes['TopModel']>,
        ParentType,
        ContextType
    >;
    totalEarningByQuantity?: Resolver<
        ResolversTypes['StatSectionPercentsWithMax'],
        ParentType,
        ContextType
    >;
    totalEarnings?: Resolver<
        ResolversTypes['StatSectionPercentsWithMax'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetOverallStatisticResponseOldResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['GetOverallStatisticResponseOLD'] = ResolversParentTypes['GetOverallStatisticResponseOLD'],
> = {
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    incomeInfo?: Resolver<
        Maybe<ResolversTypes['IncomeInfo']>,
        ParentType,
        ContextType
    >;
    totalNewSubs?: Resolver<
        Maybe<ResolversTypes['StatisticSection']>,
        ParentType,
        ContextType
    >;
    totalPurchases?: Resolver<
        Maybe<ResolversTypes['StatisticSection']>,
        ParentType,
        ContextType
    >;
    totalTurnover?: Resolver<
        Maybe<ResolversTypes['StatisticSection']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPreferencesByChatterIdExtensionResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['GetPreferencesByChatterIdExtensionResponse'] = ResolversParentTypes['GetPreferencesByChatterIdExtensionResponse'],
> = {
    chatter?: Resolver<
        Maybe<ResolversTypes['CreatorWithoutPreferences']>,
        ParentType,
        ContextType
    >;
    preferences?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Preferences']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserByTokenResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['GetUserByTokenResponse'] = ResolversParentTypes['GetUserByTokenResponse'],
> = {
    teams?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['TeamWithCreators']>>>,
        ParentType,
        ContextType
    >;
    token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['UserDTO']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IncomeInfoResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['IncomeInfo'] = ResolversParentTypes['IncomeInfo'],
> = {
    messages?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    subscription?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    tips?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IncomeSourceResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['IncomeSource'] = ResolversParentTypes['IncomeSource'],
> = {
    messages?: Resolver<
        ResolversTypes['TotalAndPercent'],
        ParentType,
        ContextType
    >;
    posts?: Resolver<
        ResolversTypes['TotalAndPercent'],
        ParentType,
        ContextType
    >;
    referrals?: Resolver<
        ResolversTypes['TotalAndPercent'],
        ParentType,
        ContextType
    >;
    streams?: Resolver<
        ResolversTypes['TotalAndPercent'],
        ParentType,
        ContextType
    >;
    subscriptions?: Resolver<
        ResolversTypes['TotalAndPercent'],
        ParentType,
        ContextType
    >;
    tips?: Resolver<ResolversTypes['TotalAndPercent'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeystrokesResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Keystrokes'] = ResolversParentTypes['Keystrokes'],
> = {
    chart?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['sentKeystrokesChart']>>>,
        ParentType,
        ContextType
    >;
    count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicenseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['License'] = ResolversParentTypes['License'],
> = {
    customerId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    startDate?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    status?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    subscriptionId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginExtensionResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['LoginExtensionResponse'] = ResolversParentTypes['LoginExtensionResponse'],
> = {
    teamMemberId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    visibilitySettings?: Resolver<
        Maybe<ResolversTypes['Visibility']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MassMessaging'] = ResolversParentTypes['MassMessaging'],
> = {
    activeSub?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    excludeFans?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    neverChatBefore?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    sentTo?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    startDate?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingMessageResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MassMessagingMessage'] = ResolversParentTypes['MassMessagingMessage'],
> = {
    fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    massMess?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    media?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['String']>>>,
        ParentType,
        ContextType
    >;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingMessageForMessagingResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MassMessagingMessageForMessaging'] = ResolversParentTypes['MassMessagingMessageForMessaging'],
> = {
    fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    media?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['String']>>>,
        ParentType,
        ContextType
    >;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingMessageResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MassMessagingMessageResponse'] = ResolversParentTypes['MassMessagingMessageResponse'],
> = {
    massMessage?: Resolver<
        Maybe<ResolversTypes['MassMessagingMessage']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MassMessagingResponse'] = ResolversParentTypes['MassMessagingResponse'],
> = {
    massMessaging?: Resolver<
        Maybe<ResolversTypes['MassMessaging']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingWithMessagesResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MassMessagingWithMessages'] = ResolversParentTypes['MassMessagingWithMessages'],
> = {
    activeSub?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    excludeFans?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    massMessages?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['MassMessagingMessageForMessaging']>>>,
        ParentType,
        ContextType
    >;
    neverChatBefore?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    sentTo?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    startDate?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingWithMessagesResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MassMessagingWithMessagesResponse'] = ResolversParentTypes['MassMessagingWithMessagesResponse'],
> = {
    massMessaging?: Resolver<
        Maybe<ResolversTypes['MassMessagingWithMessages']>,
        ParentType,
        ContextType
    >;
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
    acceptTeamMember?: Resolver<
        ResolversTypes['TeamMemberResponse'],
        ParentType,
        ContextType,
        Partial<MutationAcceptTeamMemberArgs>
    >;
    addAUTOProxy?: Resolver<
        Maybe<ResolversTypes['chooseProxyResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationAddAutoProxyArgs, 'country'>
    >;
    addCreator?: Resolver<
        Maybe<ResolversTypes['AddCreatorResponse']>,
        ParentType,
        ContextType,
        Partial<MutationAddCreatorArgs>
    >;
    addCreatorExtension?: Resolver<
        Maybe<ResolversTypes['LoginExtensionResponse']>,
        ParentType,
        ContextType,
        Partial<MutationAddCreatorExtensionArgs>
    >;
    addPreferences?: Resolver<
        Maybe<ResolversTypes['PreferencesForChatterId']>,
        ParentType,
        ContextType,
        Partial<MutationAddPreferencesArgs>
    >;
    addTeamMember?: Resolver<
        ResolversTypes['TeamMemberWithEmails'],
        ParentType,
        ContextType,
        Partial<MutationAddTeamMemberArgs>
    >;
    addVaultMediaExtension?: Resolver<
        Maybe<ResolversTypes['AddVaultMediaResponse']>,
        ParentType,
        ContextType,
        Partial<MutationAddVaultMediaExtensionArgs>
    >;
    changeAppAuthExtension?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationChangeAppAuthExtensionArgs>
    >;
    changeAutoFollow?: Resolver<
        Maybe<ResolversTypes['AutoFollow']>,
        ParentType,
        ContextType,
        Partial<MutationChangeAutoFollowArgs>
    >;
    changeChatterTrackingApp?: Resolver<
        Maybe<ResolversTypes['ChatterTracking']>,
        ParentType,
        ContextType,
        Partial<MutationChangeChatterTrackingAppArgs>
    >;
    changeCreatorAuth?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationChangeCreatorAuthArgs>
    >;
    changeCreatorAuthByExtension?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationChangeCreatorAuthByExtensionArgs>
    >;
    changeCreatorVisibility?: Resolver<
        Maybe<ResolversTypes['VisibilityChangeResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeCreatorVisibilityArgs>
    >;
    changeDisplayColor?: Resolver<
        Maybe<ResolversTypes['DisplayColorResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationChangeDisplayColorArgs, 'input'>
    >;
    changeDisplaySettings?: Resolver<
        Maybe<ResolversTypes['DisplaySettingsResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeDisplaySettingsArgs>
    >;
    changeExpiringFans?: Resolver<
        Maybe<ResolversTypes['ExpiringFansResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeExpiringFansArgs>
    >;
    changeExpiringFansMessage?: Resolver<
        Maybe<ResolversTypes['ExpiringFansMessageResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationChangeExpiringFansMessageArgs, 'input'>
    >;
    changeFanNumbering?: Resolver<
        Maybe<ResolversTypes['FanNumbering']>,
        ParentType,
        ContextType,
        Partial<MutationChangeFanNumberingArgs>
    >;
    changeFanSpendLists?: Resolver<
        Maybe<ResolversTypes['FanSpendLists']>,
        ParentType,
        ContextType,
        Partial<MutationChangeFanSpendListsArgs>
    >;
    changeLastOnlineExtension?: Resolver<
        Maybe<ResolversTypes['TeamMemberForResp']>,
        ParentType,
        ContextType,
        RequireFields<MutationChangeLastOnlineExtensionArgs, 'teamMemberId'>
    >;
    changeMassMessage?: Resolver<
        Maybe<ResolversTypes['MassMessagingMessageResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeMassMessageArgs>
    >;
    changeMassMessaging?: Resolver<
        Maybe<ResolversTypes['MassMessagingResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeMassMessagingArgs>
    >;
    changeNewSubsList?: Resolver<
        Maybe<ResolversTypes['Creator']>,
        ParentType,
        ContextType,
        Partial<MutationChangeNewSubsListArgs>
    >;
    changePPVFollow?: Resolver<
        Maybe<ResolversTypes['changePPVFollow']>,
        ParentType,
        ContextType,
        Partial<MutationChangePpvFollowArgs>
    >;
    changePPVMessage?: Resolver<
        Maybe<ResolversTypes['PPVMessageResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangePpvMessageArgs>
    >;
    changePassword?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        RequireFields<MutationChangePasswordArgs, 'input'>
    >;
    changePromotionReactivator?: Resolver<
        Maybe<ResolversTypes['PromotionReactivator']>,
        ParentType,
        ContextType,
        Partial<MutationChangePromotionReactivatorArgs>
    >;
    changeScript?: Resolver<
        Maybe<ResolversTypes['ScriptResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeScriptArgs>
    >;
    changeScriptFolder?: Resolver<
        Maybe<ResolversTypes['ScriptFolderResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeScriptFolderArgs>
    >;
    changeTask?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Task']>>>,
        ParentType,
        ContextType,
        Partial<MutationChangeTaskArgs>
    >;
    changeTaskStatus?: Resolver<
        Maybe<ResolversTypes['Task']>,
        ParentType,
        ContextType,
        Partial<MutationChangeTaskStatusArgs>
    >;
    changeTeam?: Resolver<
        Maybe<ResolversTypes['Team']>,
        ParentType,
        ContextType,
        Partial<MutationChangeTeamArgs>
    >;
    changeTeamMember?: Resolver<
        ResolversTypes['TeamMemberWithEmails'],
        ParentType,
        ContextType,
        Partial<MutationChangeTeamMemberArgs>
    >;
    changeUser?: Resolver<
        Maybe<ResolversTypes['UserDTO']>,
        ParentType,
        ContextType,
        Partial<MutationChangeUserArgs>
    >;
    changeWelcomeMessage?: Resolver<
        Maybe<ResolversTypes['WelcomeMessageResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationChangeWelcomeMessageArgs, 'input'>
    >;
    changeWelcomeSettings?: Resolver<
        Maybe<ResolversTypes['WelcomeSettingsResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChangeWelcomeSettingsArgs>
    >;
    checkProxyIp?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationCheckProxyIpArgs>
    >;
    chooseAUTOProxy?: Resolver<
        Maybe<ResolversTypes['chooseProxyResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChooseAutoProxyArgs>
    >;
    chooseHTTPProxy?: Resolver<
        Maybe<ResolversTypes['chooseProxyResponse']>,
        ParentType,
        ContextType,
        Partial<MutationChooseHttpProxyArgs>
    >;
    createDisplayColor?: Resolver<
        Maybe<ResolversTypes['DisplayColorResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationCreateDisplayColorArgs, 'input'>
    >;
    createExpiringFansMessage?: Resolver<
        Maybe<ResolversTypes['ExpiringFansMessageResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationCreateExpiringFansMessageArgs, 'input'>
    >;
    createFanSpendLists?: Resolver<
        Maybe<ResolversTypes['FanSpendLists']>,
        ParentType,
        ContextType,
        Partial<MutationCreateFanSpendListsArgs>
    >;
    createMassMessage?: Resolver<
        Maybe<ResolversTypes['MassMessagingMessageResponse']>,
        ParentType,
        ContextType,
        Partial<MutationCreateMassMessageArgs>
    >;
    createMassMessaging?: Resolver<
        Maybe<ResolversTypes['MassMessagingWithMessagesResponse']>,
        ParentType,
        ContextType,
        Partial<MutationCreateMassMessagingArgs>
    >;
    createNewPassword?: Resolver<
        ResolversTypes['UserDTO'],
        ParentType,
        ContextType,
        Partial<MutationCreateNewPasswordArgs>
    >;
    createPPVMessage?: Resolver<
        Maybe<ResolversTypes['PPVMessageResponse']>,
        ParentType,
        ContextType,
        Partial<MutationCreatePpvMessageArgs>
    >;
    createScript?: Resolver<
        Maybe<ResolversTypes['ScriptResponse']>,
        ParentType,
        ContextType,
        Partial<MutationCreateScriptArgs>
    >;
    createScriptFolder?: Resolver<
        Maybe<ResolversTypes['ScriptFolderResponse']>,
        ParentType,
        ContextType,
        Partial<MutationCreateScriptFolderArgs>
    >;
    createTask?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Task']>>>,
        ParentType,
        ContextType,
        Partial<MutationCreateTaskArgs>
    >;
    createWelcomeMessage?: Resolver<
        Maybe<ResolversTypes['WelcomeMessageResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationCreateWelcomeMessageArgs, 'input'>
    >;
    deleteAUTOProxy?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteAutoProxyArgs>
    >;
    deleteCreator?: Resolver<
        Maybe<ResolversTypes['CreatorDeleteResponse']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteCreatorArgs>
    >;
    deleteDisplayColor?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteDisplayColorArgs>
    >;
    deleteExpiringFansMessage?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteExpiringFansMessageArgs>
    >;
    deleteFanSpendLists?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteFanSpendListsArgs>
    >;
    deleteMassMessage?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteMassMessageArgs>
    >;
    deletePPVMessage?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        RequireFields<MutationDeletePpvMessageArgs, 'pPVMessageId'>
    >;
    deleteScript?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        RequireFields<MutationDeleteScriptArgs, 'id'>
    >;
    deleteScriptFolder?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteScriptFolderArgs>
    >;
    deleteTask?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteTaskArgs>
    >;
    deleteTeamMember?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        Partial<MutationDeleteTeamMemberArgs>
    >;
    deleteWelcomeMessage?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationDeleteWelcomeMessageArgs>
    >;
    duplicateMassMessaging?: Resolver<
        Maybe<ResolversTypes['MassMessagingResponse']>,
        ParentType,
        ContextType,
        Partial<MutationDuplicateMassMessagingArgs>
    >;
    forgotPassword?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        RequireFields<MutationForgotPasswordArgs, 'login'>
    >;
    getBillingPortal?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationGetBillingPortalArgs>
    >;
    login?: Resolver<
        ResolversTypes['RegisterOrLoginResponse'],
        ParentType,
        ContextType,
        Partial<MutationLoginArgs>
    >;
    loginExtension?: Resolver<
        Maybe<ResolversTypes['LoginExtensionResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationLoginExtensionArgs, 'input'>
    >;
    paymentCheckout?: Resolver<
        Maybe<ResolversTypes['PaymentUrl']>,
        ParentType,
        ContextType,
        Partial<MutationPaymentCheckoutArgs>
    >;
    register?: Resolver<
        ResolversTypes['RegisterOrLoginResponse'],
        ParentType,
        ContextType,
        Partial<MutationRegisterArgs>
    >;
    sessionGenerateQrcode?: Resolver<
        ResolversTypes['QrcodeResponse'],
        ParentType,
        ContextType
    >;
    sessionScanQrcode?: Resolver<
        ResolversTypes['ScanResponse'],
        ParentType,
        ContextType,
        Partial<MutationSessionScanQrcodeArgs>
    >;
    temporarySendWelcomeMessage?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        Partial<MutationTemporarySendWelcomeMessageArgs>
    >;
};

export type MyTeamPopulatedResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['MyTeamPopulated'] = ResolversParentTypes['MyTeamPopulated'],
> = {
    members?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['TeamMemberWithEmails']>>>,
        ParentType,
        ContextType
    >;
    team?: Resolver<
        Maybe<ResolversTypes['TeamResponse']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewSubListsResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['NewSubListsResponse'] = ResolversParentTypes['NewSubListsResponse'],
> = {
    collectionListId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    collectionLists?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['CollectionList']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OfDetStatResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OFDetStat'] = ResolversParentTypes['OFDetStat'],
> = {
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    expired?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    messages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    newActiveFans?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    newSubs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    referrals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    renews?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    subscription?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    tips?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalActiveFans?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalEarning?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OldChatterTrackingResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OldChatterTracking'] = ResolversParentTypes['OldChatterTracking'],
> = {
    chatterTable?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ChatterDetailed']>>>,
        ParentType,
        ContextType
    >;
    revenueChart?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['RevenueChart']>>>,
        ParentType,
        ContextType
    >;
    topChattersChart?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ChatterShort']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OldRegisterOrLoginResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OldRegisterOrLoginResponse'] = ResolversParentTypes['OldRegisterOrLoginResponse'],
> = {
    creators?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['CreatorForUser']>>>,
        ParentType,
        ContextType
    >;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['UserDTO']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OneChatterInfoResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OneChatterInfo'] = ResolversParentTypes['OneChatterInfo'],
> = {
    conversionRate?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    keystrokes?: Resolver<
        Maybe<ResolversTypes['Keystrokes']>,
        ParentType,
        ContextType
    >;
    linkClicks?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    messagesRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    newSubs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    newSubsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    onlineTime?: Resolver<
        Maybe<ResolversTypes['OnlineTime']>,
        ParentType,
        ContextType
    >;
    openChats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    ppvPurchaseRate?: Resolver<
        Maybe<ResolversTypes['PpvPurchaseRate']>,
        ParentType,
        ContextType
    >;
    recSubsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    sellingChats?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    sentMessages?: Resolver<
        Maybe<ResolversTypes['SentMessages']>,
        ParentType,
        ContextType
    >;
    textingRation?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    tipsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    totalRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    totalSales?: Resolver<
        Maybe<ResolversTypes['TotalSales']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OneChatterStatisticResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OneChatterStatistic'] = ResolversParentTypes['OneChatterStatistic'],
> = {
    fansChatted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    goldenRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    msgsSent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    ppvsSent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    ppvsUnlocked?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    sales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    teamMember?: Resolver<
        ResolversTypes['ChatterTeamMember'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OneStatResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OneStat'] = ResolversParentTypes['OneStat'],
> = {
    percent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    today?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    yesterday?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnlineTimeResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OnlineTime'] = ResolversParentTypes['OnlineTime'],
> = {
    activeTime?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    inActiveTime?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    onlineTime?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OverallDailyStatsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OverallDailyStats'] = ResolversParentTypes['OverallDailyStats'],
> = {
    actual24hStats?: Resolver<
        ResolversTypes['DailyStats'],
        ParentType,
        ContextType
    >;
    previous24hTurnover?: Resolver<
        ResolversTypes['StatSectionPercents'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OverallDetCompResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OverallDetCompResponse'] = ResolversParentTypes['OverallDetCompResponse'],
> = {
    creatorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    creatorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    messagesRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    newSubs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    newSubsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    openChats?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    sellingChats?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    textingRation?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    tipsRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    totalRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvFollowResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PPVFollow'] = ResolversParentTypes['PPVFollow'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    include?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvMessageResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PPVMessage'] = ResolversParentTypes['PPVMessage'],
> = {
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    media?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['String']>>>,
        ParentType,
        ContextType
    >;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvMessageResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PPVMessageResponse'] = ResolversParentTypes['PPVMessageResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    pPVMessage?: Resolver<
        Maybe<ResolversTypes['PPVMessage']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingStatisticResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PPVTrackingStatistic'] = ResolversParentTypes['PPVTrackingStatistic'],
> = {
    conversion?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lastSale?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    qtyPictures?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    qtyVideos?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    revenue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentUrlResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PaymentUrl'] = ResolversParentTypes['PaymentUrl'],
> = {
    checkoutSessionId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    redirectUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerformerTaskResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PerformerTask'] = ResolversParentTypes['PerformerTask'],
> = {
    endDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    performer?: Resolver<
        ResolversTypes['PerformerWithoutPerms'],
        ParentType,
        ContextType
    >;
    startDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerformerWithoutPermsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PerformerWithoutPerms'] = ResolversParentTypes['PerformerWithoutPerms'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    memberName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    role?: Resolver<
        Maybe<ResolversTypes['MemberRoleSchema']>,
        ParentType,
        ContextType
    >;
    teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermissionForUserResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PermissionForUser'] = ResolversParentTypes['PermissionForUser'],
> = {
    modifyCreatorSettings?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    seeCreatorStats?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    seeTracking?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    setupMessagesFunctions?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    startOFProfile?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermissionsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Permissions'] = ResolversParentTypes['Permissions'],
> = {
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    modifyCreatorSettings?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    seeCreatorStats?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    seeTracking?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    setupMessagesFunctions?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    startOFProfile?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvPurchaseRateResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PpvPurchaseRate'] = ResolversParentTypes['PpvPurchaseRate'],
> = {
    chart?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ppvPurchaseRateChart']>>>,
        ParentType,
        ContextType
    >;
    percent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingMessageResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PpvTrackingMessage'] = ResolversParentTypes['PpvTrackingMessage'],
> = {
    messageId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    purchased?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    sender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    sentAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PpvTrackingResponse'] = ResolversParentTypes['PpvTrackingResponse'],
> = {
    purchaseRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    purchases?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    revenue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    statistic?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['PPVTrackingStatistic']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingVaultMessagesResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PpvTrackingVaultMessagesResponse'] = ResolversParentTypes['PpvTrackingVaultMessagesResponse'],
> = {
    avgNetPrice?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    bought?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    message?: Resolver<
        Maybe<ResolversTypes['PpvTrackingMessage']>,
        ParentType,
        ContextType
    >;
    netRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    purchaseRate?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    sent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingVaultResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PpvTrackingVaultResponse'] = ResolversParentTypes['PpvTrackingVaultResponse'],
> = {
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    ppvMessages?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['PpvVaultMessage']>>>,
        ParentType,
        ContextType
    >;
    purchaseRate?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    purchases?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    revenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvVaultMessageResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PpvVaultMessage'] = ResolversParentTypes['PpvVaultMessage'],
> = {
    avgNetPrice?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    bought?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    createdAt?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    netRevenue?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    ppvId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    purchaseRate?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    sent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Preferences'] = ResolversParentTypes['Preferences'],
> = {
    subscriberId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesForChatterIdResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PreferencesForChatterId'] = ResolversParentTypes['PreferencesForChatterId'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    preferences?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Preferences']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromotionReactivatorResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PromotionReactivator'] = ResolversParentTypes['PromotionReactivator'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProxyResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Proxy'] = ResolversParentTypes['Proxy'],
> = {
    creatorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    host?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    password?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    port?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    proxyType?: Resolver<ResolversTypes['ProxyType'], ParentType, ContextType>;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    zone?: Resolver<
        Maybe<ResolversTypes['ProxyZone']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProxyForCreatorResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ProxyForCreator'] = ResolversParentTypes['ProxyForCreator'],
> = {
    country?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    host?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    password?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    port?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    proxyType?: Resolver<ResolversTypes['ProxyType'], ParentType, ContextType>;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProxyZoneResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ProxyZone'] = ResolversParentTypes['ProxyZone'],
> = {
    country?: Resolver<
        Maybe<ResolversTypes['EnabledRegionProxy']>,
        ParentType,
        ContextType
    >;
    number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicDataResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['PublicData'] = ResolversParentTypes['PublicData'],
> = {
    _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    avatarURL?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    joinDate?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QrcodeResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['QrcodeResponse'] = ResolversParentTypes['QrcodeResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    qrCodeUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
    getAllCreatorVaultMedia?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['VaultMedia']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllCreatorVaultMediaArgs>
    >;
    getAllCreatorVaultMediaExtension?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['VaultMedia']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllCreatorVaultMediaExtensionArgs>
    >;
    getAllDisplayColors?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['DisplayColor']>>>,
        ParentType,
        ContextType,
        RequireFields<QueryGetAllDisplayColorsArgs, 'creatorId'>
    >;
    getAllDisplayColorsExtension?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['DisplayColor']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllDisplayColorsExtensionArgs>
    >;
    getAllExpiringFansMessages?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ExpiringFansMessage']>>>,
        ParentType,
        ContextType,
        RequireFields<QueryGetAllExpiringFansMessagesArgs, 'creatorId'>
    >;
    getAllMassMessaging?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['MassMessagingWithMessages']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllMassMessagingArgs>
    >;
    getAllMessages?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['MassMessagingMessage']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllMessagesArgs>
    >;
    getAllPPVMessage?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['PPVMessage']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllPpvMessageArgs>
    >;
    getAllPerformers?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['PerformerWithoutPerms']>>>,
        ParentType,
        ContextType
    >;
    getAllScriptsExtension?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ScriptExtension']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllScriptsExtensionArgs>
    >;
    getAllTasksOwner?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Task']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetAllTasksOwnerArgs>
    >;
    getAllWelcomeMessage?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['WelcomeMessage']>>>,
        ParentType,
        ContextType,
        RequireFields<QueryGetAllWelcomeMessageArgs, 'creatorId'>
    >;
    getAppExtensionData?: Resolver<
        Maybe<ResolversTypes['LoginExtensionResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetAppExtensionDataArgs>
    >;
    getAutoFollow?: Resolver<
        Maybe<ResolversTypes['AutoFollow']>,
        ParentType,
        ContextType,
        Partial<QueryGetAutoFollowArgs>
    >;
    getAvailableCountries?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['CountryMap']>>>,
        ParentType,
        ContextType
    >;
    getChatterTracking?: Resolver<
        Maybe<ResolversTypes['ChatterTrackingResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetChatterTrackingArgs>
    >;
    getChatterTrackingApp?: Resolver<
        Maybe<ResolversTypes['ChatterTracking']>,
        ParentType,
        ContextType,
        Partial<QueryGetChatterTrackingAppArgs>
    >;
    getCreatorAuth?: Resolver<
        Maybe<ResolversTypes['CreatorAuth']>,
        ParentType,
        ContextType,
        Partial<QueryGetCreatorAuthArgs>
    >;
    getCreatorById?: Resolver<
        Maybe<ResolversTypes['Creator']>,
        ParentType,
        ContextType,
        Partial<QueryGetCreatorByIdArgs>
    >;
    getCreatorFanSpendLists?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['FanSpendLists']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetCreatorFanSpendListsArgs>
    >;
    getCreatorProxy?: Resolver<
        Maybe<ResolversTypes['Proxy']>,
        ParentType,
        ContextType,
        Partial<QueryGetCreatorProxyArgs>
    >;
    getCreatorProxyExtension?: Resolver<
        Maybe<ResolversTypes['Proxy']>,
        ParentType,
        ContextType,
        Partial<QueryGetCreatorProxyExtensionArgs>
    >;
    getCreatorScriptFolders?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ScriptFoldersWithScripts']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetCreatorScriptFoldersArgs>
    >;
    getCreatorStatisticOLD?: Resolver<
        Maybe<ResolversTypes['GetCreatorStatisticResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetCreatorStatisticOldArgs>
    >;
    getCreatorVisibility?: Resolver<
        Maybe<ResolversTypes['VisibilityChangeResponse']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetCreatorVisibilityArgs, 'creatorId'>
    >;
    getDetailedStatisticOLD?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['DetStatsResponse']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetDetailedStatisticOldArgs>
    >;
    getDisplaySettings?: Resolver<
        Maybe<ResolversTypes['DisplaySettings']>,
        ParentType,
        ContextType,
        Partial<QueryGetDisplaySettingsArgs>
    >;
    getDisplaySettingsExtension?: Resolver<
        Maybe<ResolversTypes['DisplaySettings']>,
        ParentType,
        ContextType,
        Partial<QueryGetDisplaySettingsExtensionArgs>
    >;
    getExpiringFans?: Resolver<
        Maybe<ResolversTypes['ExpiringFans']>,
        ParentType,
        ContextType,
        Partial<QueryGetExpiringFansArgs>
    >;
    getExtensionTokenThrowToken?: Resolver<
        Maybe<ResolversTypes['ExtensionTokenResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetExtensionTokenThrowTokenArgs>
    >;
    getFanNumbering?: Resolver<
        Maybe<ResolversTypes['FanNumbering']>,
        ParentType,
        ContextType,
        Partial<QueryGetFanNumberingArgs>
    >;
    getFanSpendListsById?: Resolver<
        Maybe<ResolversTypes['FanSpendLists']>,
        ParentType,
        ContextType,
        Partial<QueryGetFanSpendListsByIdArgs>
    >;
    getMyTasks?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['PerformerTask']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetMyTasksArgs>
    >;
    getMyTeam?: Resolver<
        Maybe<ResolversTypes['MyTeamPopulated']>,
        ParentType,
        ContextType
    >;
    getMyTeamMembers?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['TeamMemberWithEmails']>>>,
        ParentType,
        ContextType
    >;
    getMyTeamTasks?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['PerformerTask']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetMyTeamTasksArgs>
    >;
    getNewSubsLists?: Resolver<
        Maybe<ResolversTypes['NewSubListsResponse']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetNewSubsListsArgs, 'creatorId'>
    >;
    getOFDetailedStats?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['OFDetStat']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetOfDetailedStatsArgs>
    >;
    getOFStats?: Resolver<
        Maybe<ResolversTypes['GetOFStatsResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetOfStatsArgs>
    >;
    getOldChattersTracking?: Resolver<
        Maybe<ResolversTypes['OldChatterTracking']>,
        ParentType,
        ContextType,
        Partial<QueryGetOldChattersTrackingArgs>
    >;
    getOneChatterTracking?: Resolver<
        Maybe<ResolversTypes['OneChatterInfo']>,
        ParentType,
        ContextType,
        Partial<QueryGetOneChatterTrackingArgs>
    >;
    getOneDisplayColor?: Resolver<
        Maybe<ResolversTypes['DisplayColor']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetOneDisplayColorArgs, 'displayColorId'>
    >;
    getOneExpiringFansMessage?: Resolver<
        Maybe<ResolversTypes['ExpiringFansMessage']>,
        ParentType,
        ContextType,
        RequireFields<
            QueryGetOneExpiringFansMessageArgs,
            'expiringFansMessageId'
        >
    >;
    getOneMassMessage?: Resolver<
        Maybe<ResolversTypes['MassMessagingMessage']>,
        ParentType,
        ContextType,
        Partial<QueryGetOneMassMessageArgs>
    >;
    getOneMassMessaging?: Resolver<
        Maybe<ResolversTypes['MassMessaging']>,
        ParentType,
        ContextType,
        Partial<QueryGetOneMassMessagingArgs>
    >;
    getOnePPVMessage?: Resolver<
        Maybe<ResolversTypes['PPVMessage']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetOnePpvMessageArgs, 'pPVMessageId'>
    >;
    getOneWelcomeMessage?: Resolver<
        Maybe<ResolversTypes['WelcomeMessage']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetOneWelcomeMessageArgs, 'welcomeMessageId'>
    >;
    getOverallDailyStats?: Resolver<
        Maybe<ResolversTypes['OverallDailyStats']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetOverallDailyStatsArgs, 'creatorIds'>
    >;
    getOverallDetailedComparison?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['OverallDetCompResponse']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetOverallDetailedComparisonArgs>
    >;
    getOverallStatistic?: Resolver<
        Maybe<ResolversTypes['GetOverallStatisticResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetOverallStatisticArgs>
    >;
    getOverallStatisticOLD?: Resolver<
        Maybe<ResolversTypes['GetOverallStatisticResponseOLD']>,
        ParentType,
        ContextType,
        Partial<QueryGetOverallStatisticOldArgs>
    >;
    getPPVFollow?: Resolver<
        Maybe<ResolversTypes['PPVFollow']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetPpvFollowArgs, 'creatorId'>
    >;
    getPPVTracking?: Resolver<
        Maybe<ResolversTypes['PpvTrackingResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetPpvTrackingArgs>
    >;
    getPPVTrackingVault?: Resolver<
        Maybe<ResolversTypes['PpvTrackingVaultResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetPpvTrackingVaultArgs>
    >;
    getPPVTrackingVaultMessages?: Resolver<
        Maybe<ResolversTypes['PpvTrackingVaultMessagesResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetPpvTrackingVaultMessagesArgs>
    >;
    getPreferencesByChatterIdExtension?: Resolver<
        Maybe<ResolversTypes['GetPreferencesByChatterIdExtensionResponse']>,
        ParentType,
        ContextType,
        Partial<QueryGetPreferencesByChatterIdExtensionArgs>
    >;
    getPromotionReactivator?: Resolver<
        Maybe<ResolversTypes['PromotionReactivator']>,
        ParentType,
        ContextType,
        Partial<QueryGetPromotionReactivatorArgs>
    >;
    getPublicDataFromLink?: Resolver<
        Maybe<ResolversTypes['PublicData']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetPublicDataFromLinkArgs, 'link'>
    >;
    getScriptById?: Resolver<
        Maybe<ResolversTypes['Script']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetScriptByIdArgs, 'id'>
    >;
    getScriptFolderById?: Resolver<
        Maybe<ResolversTypes['ScriptFolder']>,
        ParentType,
        ContextType,
        Partial<QueryGetScriptFolderByIdArgs>
    >;
    getScriptsByKeyLettersExtension?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Script']>>>,
        ParentType,
        ContextType,
        Partial<QueryGetScriptsByKeyLettersExtensionArgs>
    >;
    getUserByToken?: Resolver<
        Maybe<ResolversTypes['GetUserByTokenResponse']>,
        ParentType,
        ContextType
    >;
    getUserCreatorsProxy?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['CreatorWithProxy']>>>,
        ParentType,
        ContextType
    >;
    getVisibilitySettingByTokenExtension?: Resolver<
        Maybe<ResolversTypes['VisibilitySettingByExtension']>,
        ParentType,
        ContextType,
        Partial<QueryGetVisibilitySettingByTokenExtensionArgs>
    >;
    getWelcomeSettings?: Resolver<
        Maybe<ResolversTypes['WelcomeSettings']>,
        ParentType,
        ContextType,
        Partial<QueryGetWelcomeSettingsArgs>
    >;
    updateCreatorsStats?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType,
        RequireFields<QueryUpdateCreatorsStatsArgs, 'creatorIds'>
    >;
};

export type ReceivedHistoryResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ReceivedHistory'] = ResolversParentTypes['ReceivedHistory'],
> = {
    date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    received?: Resolver<
        Maybe<ResolversTypes['Float']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterOrLoginResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['RegisterOrLoginResponse'] = ResolversParentTypes['RegisterOrLoginResponse'],
> = {
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    teams?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['TeamWithCreators']>>>,
        ParentType,
        ContextType
    >;
    token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['UserDTO']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetPasswordResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ResetPassword'] = ResolversParentTypes['ResetPassword'],
> = {
    expire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    resetCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RevenueChartResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['RevenueChart'] = ResolversParentTypes['RevenueChart'],
> = {
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    receivedHistory?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ReceivedHistory']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScanResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScanResponse'] = ResolversParentTypes['ScanResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    user?: Resolver<Maybe<ResolversTypes['UserDTO']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Script'] = ResolversParentTypes['Script'],
> = {
    customName?: Resolver<ResolversTypes['NameEnum'], ParentType, ContextType>;
    fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    fanName?: Resolver<ResolversTypes['NameEnum'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    scriptFolder?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptExtensionResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScriptExtension'] = ResolversParentTypes['ScriptExtension'],
> = {
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    scriptId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFolderResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScriptFolder'] = ResolversParentTypes['ScriptFolder'],
> = {
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    folderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFolderResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScriptFolderResponse'] = ResolversParentTypes['ScriptFolderResponse'],
> = {
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    scriptFolder?: Resolver<
        Maybe<ResolversTypes['ScriptFolder']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFolderWithScriptResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScriptFolderWithScript'] = ResolversParentTypes['ScriptFolderWithScript'],
> = {
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    folderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    scripts?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ScriptForFolder']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFoldersWithScriptsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScriptFoldersWithScripts'] = ResolversParentTypes['ScriptFoldersWithScripts'],
> = {
    scriptFolders?: Resolver<
        Maybe<ResolversTypes['ScriptFolderWithScript']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptForFolderResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScriptForFolder'] = ResolversParentTypes['ScriptForFolder'],
> = {
    fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ScriptResponse'] = ResolversParentTypes['ScriptResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    script?: Resolver<Maybe<ResolversTypes['Script']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentMessagesResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['SentMessages'] = ResolversParentTypes['SentMessages'],
> = {
    chart?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['sentMessagesChart']>>>,
        ParentType,
        ContextType
    >;
    count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatSectionPercentsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['StatSectionPercents'] = ResolversParentTypes['StatSectionPercents'],
> = {
    chart?: Resolver<
        Array<ResolversTypes['DateAndAmount']>,
        ParentType,
        ContextType
    >;
    percent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatSectionPercentsWithMaxResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['StatSectionPercentsWithMax'] = ResolversParentTypes['StatSectionPercentsWithMax'],
> = {
    chart?: Resolver<
        Array<ResolversTypes['DateAndAmount']>,
        ParentType,
        ContextType
    >;
    maxValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalAndPercent?: Resolver<
        ResolversTypes['TotalAndPercent'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticFollowersWithPercentResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['StatisticFollowersWithPercent'] = ResolversParentTypes['StatisticFollowersWithPercent'],
> = {
    chart?: Resolver<
        Array<ResolversTypes['DateNewExpired']>,
        ParentType,
        ContextType
    >;
    maxValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalAndPercent?: Resolver<
        ResolversTypes['TotalAndPercent'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticSectionResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['StatisticSection'] = ResolversParentTypes['StatisticSection'],
> = {
    chart?: Resolver<
        Array<ResolversTypes['DateAndCount']>,
        ParentType,
        ContextType
    >;
    total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Task'] = ResolversParentTypes['Task'],
> = {
    endDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    performer?: Resolver<
        ResolversTypes['PerformerWithoutPerms'],
        ParentType,
        ContextType
    >;
    startDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    status?: Resolver<
        Maybe<ResolversTypes['TaskStatusType']>,
        ParentType,
        ContextType
    >;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Team'] = ResolversParentTypes['Team'],
> = {
    creatorIds?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['ID']>>>,
        ParentType,
        ContextType
    >;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    logoUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    teamMemberIds?: Resolver<
        Array<ResolversTypes['ID']>,
        ParentType,
        ContextType
    >;
    teamName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TeamMember'] = ResolversParentTypes['TeamMember'],
> = {
    acceptLink?: Resolver<
        Maybe<ResolversTypes['AcceptLink']>,
        ParentType,
        ContextType
    >;
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    lastOnlineAt?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    memberName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    permissions?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Permissions']>>>,
        ParentType,
        ContextType
    >;
    role?: Resolver<
        Maybe<ResolversTypes['MemberRoleSchema']>,
        ParentType,
        ContextType
    >;
    teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberForRespResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TeamMemberForResp'] = ResolversParentTypes['TeamMemberForResp'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    lastOnlineAt?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    memberName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    permissions?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Permissions']>>>,
        ParentType,
        ContextType
    >;
    role?: Resolver<
        Maybe<ResolversTypes['MemberRoleSchema']>,
        ParentType,
        ContextType
    >;
    teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TeamMemberResponse'] = ResolversParentTypes['TeamMemberResponse'],
> = {
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    teamMember?: Resolver<
        ResolversTypes['TeamMemberForResp'],
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberWithEmailsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TeamMemberWithEmails'] = ResolversParentTypes['TeamMemberWithEmails'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    lastOnlineAt?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    memberName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    permissions?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Permissions']>>>,
        ParentType,
        ContextType
    >;
    role?: Resolver<
        Maybe<ResolversTypes['MemberRoleSchema']>,
        ParentType,
        ContextType
    >;
    teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TeamResponse'] = ResolversParentTypes['TeamResponse'],
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    logoUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    teamName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamWithCreatorsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TeamWithCreators'] = ResolversParentTypes['TeamWithCreators'],
> = {
    creators?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['CreatorForUser']>>>,
        ParentType,
        ContextType
    >;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    logoUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    teamMemberIds?: Resolver<
        Array<ResolversTypes['ID']>,
        ParentType,
        ContextType
    >;
    teamName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopFanResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TopFan'] = ResolversParentTypes['TopFan'],
> = {
    avatarUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    userName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopFanOverviewResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TopFanOverview'] = ResolversParentTypes['TopFanOverview'],
> = {
    avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    revenueByPeriod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalRevenue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopModelResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TopModel'] = ResolversParentTypes['TopModel'],
> = {
    avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    revenueByPeriod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalAndPercentResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TotalAndPercent'] = ResolversParentTypes['TotalAndPercent'],
> = {
    percent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalChartResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TotalChart'] = ResolversParentTypes['TotalChart'],
> = {
    messages?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    posts?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    referrals?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    streams?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    subscription?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    tips?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalSalesResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['TotalSales'] = ResolversParentTypes['TotalSales'],
> = {
    chart?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['totalSalesChart']>>>,
        ParentType,
        ContextType
    >;
    total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
    avatarUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    isTwoFactorEnabled?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    lastActivity?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    resetPassword?: Resolver<
        Maybe<ResolversTypes['ResetPassword']>,
        ParentType,
        ContextType
    >;
    role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDtoResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['UserDTO'] = ResolversParentTypes['UserDTO'],
> = {
    avatarUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    isTwoFactorEnabled?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    lastActivity?: Resolver<
        Maybe<ResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VaultMediaResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['VaultMedia'] = ResolversParentTypes['VaultMedia'],
> = {
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    fileName?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    media_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    price?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    scriptId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilityResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Visibility'] = ResolversParentTypes['Visibility'],
> = {
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    showFanDetails?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    showFanSpending?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    showGlobalInfo?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    showScripts?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilityChangeResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['VisibilityChangeResponse'] = ResolversParentTypes['VisibilityChangeResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    visibility?: Resolver<
        Maybe<ResolversTypes['Visibility']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilitySettingByExtensionResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['VisibilitySettingByExtension'] = ResolversParentTypes['VisibilitySettingByExtension'],
> = {
    user_id?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    visibilitySetting?: Resolver<
        Maybe<ResolversTypes['Visibility']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeMessageResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['WelcomeMessage'] = ResolversParentTypes['WelcomeMessage'],
> = {
    fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    media?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['String']>>>,
        ParentType,
        ContextType
    >;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    welcomeSettings?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeMessageResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['WelcomeMessageResponse'] = ResolversParentTypes['WelcomeMessageResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    welcomeMessage?: Resolver<
        Maybe<ResolversTypes['WelcomeMessage']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeSettingsResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['WelcomeSettings'] = ResolversParentTypes['WelcomeSettings'],
> = {
    active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeSettingsResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['WelcomeSettingsResponse'] = ResolversParentTypes['WelcomeSettingsResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    welcomeSettings?: Resolver<
        Maybe<ResolversTypes['WelcomeSettings']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePpvFollowResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['changePPVFollow'] = ResolversParentTypes['changePPVFollow'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    pPVFollow?: Resolver<
        Maybe<ResolversTypes['PPVFollow']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChooseProxyResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['chooseProxyResponse'] = ResolversParentTypes['chooseProxyResponse'],
> = {
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    proxy?: Resolver<Maybe<ResolversTypes['Proxy']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvPurchaseRateChartResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['ppvPurchaseRateChart'] = ResolversParentTypes['ppvPurchaseRateChart'],
> = {
    boughtPPV?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    sendPPV?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentKeystrokesChartResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['sentKeystrokesChart'] = ResolversParentTypes['sentKeystrokesChart'],
> = {
    count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentMessagesChartResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['sentMessagesChart'] = ResolversParentTypes['sentMessagesChart'],
> = {
    count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalSalesChartResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['totalSalesChart'] = ResolversParentTypes['totalSalesChart'],
> = {
    date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    ppvRevenue?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    tipsRevenue?: Resolver<
        Maybe<ResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
    AcceptLink?: AcceptLinkResolvers<ContextType>;
    AddCreatorResponse?: AddCreatorResponseResolvers<ContextType>;
    AddVaultMediaResponse?: AddVaultMediaResponseResolvers<ContextType>;
    AppAuth?: AppAuthResolvers<ContextType>;
    AutoFollow?: AutoFollowResolvers<ContextType>;
    Best?: BestResolvers<ContextType>;
    ChartsByType?: ChartsByTypeResolvers<ContextType>;
    ChatterDetailed?: ChatterDetailedResolvers<ContextType>;
    ChatterShort?: ChatterShortResolvers<ContextType>;
    ChatterTeamMember?: ChatterTeamMemberResolvers<ContextType>;
    ChatterTracking?: ChatterTrackingResolvers<ContextType>;
    ChatterTrackingResponse?: ChatterTrackingResponseResolvers<ContextType>;
    CollectionList?: CollectionListResolvers<ContextType>;
    Composition?: CompositionResolvers<ContextType>;
    CountryMap?: CountryMapResolvers<ContextType>;
    Creator?: CreatorResolvers<ContextType>;
    CreatorAuth?: CreatorAuthResolvers<ContextType>;
    CreatorDeleteResponse?: CreatorDeleteResponseResolvers<ContextType>;
    CreatorForAddCreatorResponse?: CreatorForAddCreatorResponseResolvers<ContextType>;
    CreatorForUser?: CreatorForUserResolvers<ContextType>;
    CreatorResponse?: CreatorResponseResolvers<ContextType>;
    CreatorWithProxy?: CreatorWithProxyResolvers<ContextType>;
    CreatorWithoutPreferences?: CreatorWithoutPreferencesResolvers<ContextType>;
    DailyStats?: DailyStatsResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateAndAmount?: DateAndAmountResolvers<ContextType>;
    DateAndCount?: DateAndCountResolvers<ContextType>;
    DateNewExpired?: DateNewExpiredResolvers<ContextType>;
    DetStatsResponse?: DetStatsResponseResolvers<ContextType>;
    DisplayColor?: DisplayColorResolvers<ContextType>;
    DisplayColorResponse?: DisplayColorResponseResolvers<ContextType>;
    DisplaySettings?: DisplaySettingsResolvers<ContextType>;
    DisplaySettingsResponse?: DisplaySettingsResponseResolvers<ContextType>;
    ExpiringFans?: ExpiringFansResolvers<ContextType>;
    ExpiringFansMessage?: ExpiringFansMessageResolvers<ContextType>;
    ExpiringFansMessageResponse?: ExpiringFansMessageResponseResolvers<ContextType>;
    ExpiringFansResponse?: ExpiringFansResponseResolvers<ContextType>;
    ExtensionTokenResponse?: ExtensionTokenResponseResolvers<ContextType>;
    FanNumbering?: FanNumberingResolvers<ContextType>;
    FanSpendLists?: FanSpendListsResolvers<ContextType>;
    GetCreatorStatisticResponse?: GetCreatorStatisticResponseResolvers<ContextType>;
    GetOFStatsResponse?: GetOfStatsResponseResolvers<ContextType>;
    GetOverallStatisticResponse?: GetOverallStatisticResponseResolvers<ContextType>;
    GetOverallStatisticResponseOLD?: GetOverallStatisticResponseOldResolvers<ContextType>;
    GetPreferencesByChatterIdExtensionResponse?: GetPreferencesByChatterIdExtensionResponseResolvers<ContextType>;
    GetUserByTokenResponse?: GetUserByTokenResponseResolvers<ContextType>;
    IncomeInfo?: IncomeInfoResolvers<ContextType>;
    IncomeSource?: IncomeSourceResolvers<ContextType>;
    Keystrokes?: KeystrokesResolvers<ContextType>;
    License?: LicenseResolvers<ContextType>;
    LoginExtensionResponse?: LoginExtensionResponseResolvers<ContextType>;
    MassMessaging?: MassMessagingResolvers<ContextType>;
    MassMessagingMessage?: MassMessagingMessageResolvers<ContextType>;
    MassMessagingMessageForMessaging?: MassMessagingMessageForMessagingResolvers<ContextType>;
    MassMessagingMessageResponse?: MassMessagingMessageResponseResolvers<ContextType>;
    MassMessagingResponse?: MassMessagingResponseResolvers<ContextType>;
    MassMessagingWithMessages?: MassMessagingWithMessagesResolvers<ContextType>;
    MassMessagingWithMessagesResponse?: MassMessagingWithMessagesResponseResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    MyTeamPopulated?: MyTeamPopulatedResolvers<ContextType>;
    NewSubListsResponse?: NewSubListsResponseResolvers<ContextType>;
    OFDetStat?: OfDetStatResolvers<ContextType>;
    OldChatterTracking?: OldChatterTrackingResolvers<ContextType>;
    OldRegisterOrLoginResponse?: OldRegisterOrLoginResponseResolvers<ContextType>;
    OneChatterInfo?: OneChatterInfoResolvers<ContextType>;
    OneChatterStatistic?: OneChatterStatisticResolvers<ContextType>;
    OneStat?: OneStatResolvers<ContextType>;
    OnlineTime?: OnlineTimeResolvers<ContextType>;
    OverallDailyStats?: OverallDailyStatsResolvers<ContextType>;
    OverallDetCompResponse?: OverallDetCompResponseResolvers<ContextType>;
    PPVFollow?: PpvFollowResolvers<ContextType>;
    PPVMessage?: PpvMessageResolvers<ContextType>;
    PPVMessageResponse?: PpvMessageResponseResolvers<ContextType>;
    PPVTrackingStatistic?: PpvTrackingStatisticResolvers<ContextType>;
    PaymentUrl?: PaymentUrlResolvers<ContextType>;
    PerformerTask?: PerformerTaskResolvers<ContextType>;
    PerformerWithoutPerms?: PerformerWithoutPermsResolvers<ContextType>;
    PermissionForUser?: PermissionForUserResolvers<ContextType>;
    Permissions?: PermissionsResolvers<ContextType>;
    PpvPurchaseRate?: PpvPurchaseRateResolvers<ContextType>;
    PpvTrackingMessage?: PpvTrackingMessageResolvers<ContextType>;
    PpvTrackingResponse?: PpvTrackingResponseResolvers<ContextType>;
    PpvTrackingVaultMessagesResponse?: PpvTrackingVaultMessagesResponseResolvers<ContextType>;
    PpvTrackingVaultResponse?: PpvTrackingVaultResponseResolvers<ContextType>;
    PpvVaultMessage?: PpvVaultMessageResolvers<ContextType>;
    Preferences?: PreferencesResolvers<ContextType>;
    PreferencesForChatterId?: PreferencesForChatterIdResolvers<ContextType>;
    PromotionReactivator?: PromotionReactivatorResolvers<ContextType>;
    Proxy?: ProxyResolvers<ContextType>;
    ProxyForCreator?: ProxyForCreatorResolvers<ContextType>;
    ProxyZone?: ProxyZoneResolvers<ContextType>;
    PublicData?: PublicDataResolvers<ContextType>;
    QrcodeResponse?: QrcodeResponseResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    ReceivedHistory?: ReceivedHistoryResolvers<ContextType>;
    RegisterOrLoginResponse?: RegisterOrLoginResponseResolvers<ContextType>;
    ResetPassword?: ResetPasswordResolvers<ContextType>;
    RevenueChart?: RevenueChartResolvers<ContextType>;
    ScanResponse?: ScanResponseResolvers<ContextType>;
    Script?: ScriptResolvers<ContextType>;
    ScriptExtension?: ScriptExtensionResolvers<ContextType>;
    ScriptFolder?: ScriptFolderResolvers<ContextType>;
    ScriptFolderResponse?: ScriptFolderResponseResolvers<ContextType>;
    ScriptFolderWithScript?: ScriptFolderWithScriptResolvers<ContextType>;
    ScriptFoldersWithScripts?: ScriptFoldersWithScriptsResolvers<ContextType>;
    ScriptForFolder?: ScriptForFolderResolvers<ContextType>;
    ScriptResponse?: ScriptResponseResolvers<ContextType>;
    SentMessages?: SentMessagesResolvers<ContextType>;
    StatSectionPercents?: StatSectionPercentsResolvers<ContextType>;
    StatSectionPercentsWithMax?: StatSectionPercentsWithMaxResolvers<ContextType>;
    StatisticFollowersWithPercent?: StatisticFollowersWithPercentResolvers<ContextType>;
    StatisticSection?: StatisticSectionResolvers<ContextType>;
    Task?: TaskResolvers<ContextType>;
    Team?: TeamResolvers<ContextType>;
    TeamMember?: TeamMemberResolvers<ContextType>;
    TeamMemberForResp?: TeamMemberForRespResolvers<ContextType>;
    TeamMemberResponse?: TeamMemberResponseResolvers<ContextType>;
    TeamMemberWithEmails?: TeamMemberWithEmailsResolvers<ContextType>;
    TeamResponse?: TeamResponseResolvers<ContextType>;
    TeamWithCreators?: TeamWithCreatorsResolvers<ContextType>;
    TopFan?: TopFanResolvers<ContextType>;
    TopFanOverview?: TopFanOverviewResolvers<ContextType>;
    TopModel?: TopModelResolvers<ContextType>;
    TotalAndPercent?: TotalAndPercentResolvers<ContextType>;
    TotalChart?: TotalChartResolvers<ContextType>;
    TotalSales?: TotalSalesResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserDTO?: UserDtoResolvers<ContextType>;
    VaultMedia?: VaultMediaResolvers<ContextType>;
    Visibility?: VisibilityResolvers<ContextType>;
    VisibilityChangeResponse?: VisibilityChangeResponseResolvers<ContextType>;
    VisibilitySettingByExtension?: VisibilitySettingByExtensionResolvers<ContextType>;
    WelcomeMessage?: WelcomeMessageResolvers<ContextType>;
    WelcomeMessageResponse?: WelcomeMessageResponseResolvers<ContextType>;
    WelcomeSettings?: WelcomeSettingsResolvers<ContextType>;
    WelcomeSettingsResponse?: WelcomeSettingsResponseResolvers<ContextType>;
    changePPVFollow?: ChangePpvFollowResolvers<ContextType>;
    chooseProxyResponse?: ChooseProxyResponseResolvers<ContextType>;
    ppvPurchaseRateChart?: PpvPurchaseRateChartResolvers<ContextType>;
    sentKeystrokesChart?: SentKeystrokesChartResolvers<ContextType>;
    sentMessagesChart?: SentMessagesChartResolvers<ContextType>;
    totalSalesChart?: TotalSalesChartResolvers<ContextType>;
};
