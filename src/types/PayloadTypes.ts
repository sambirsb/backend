export interface Payload {
    id: string;
    name?: string;
}

export interface PayloadExtension {
    id: string;
    creatorId: string;
}

export interface PayloadIdOnly {
    userId: string;
}
