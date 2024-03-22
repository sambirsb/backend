import { DateAndCount } from '../../generated/graphql';

export interface OFVisitorsResponseData {
    isAvailable: boolean;
    topCountries: TopCountries;
    topDurationUsers: TopDurationUsers;
    chart: VisitorChart;
    total: {
        current: string;
        delta: number;
    };
    hasStats: boolean;
}

export interface VisitorChart {
    visitors: DateAndCount[];
    duration: DateAndCount[];
}

interface TopCountries {
    hasMore: boolean;
    totals: Totals;
    rows: CountryRow[];
}

interface TopDurationUsers {
    totals: Totals;
}

interface CountryRow {
    rank: number;
    countryName: string;
    countryCode: string;
    viewsCount: ViewsCount;
}

interface Totals {
    total: number;
    guests: string;
    users: string;
    subscribers: number;
}

interface ViewsCount {
    total: number;
    guests: string;
    users: string;
    subscribers: number;
}
