import mongoose from 'mongoose';
import PPVMessageModel from '../models/PPVMessageModel';
import MessageModel from '../modelsStat/MessageModel';
import {
    validateChangePpvMessage,
    validateCreatePpvMessage,
} from '../validation/pPVMessageValidation';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import { elevateError } from '../errors/elevateError';
import IPPVMessage from '../types/IPPVMessage';
import {
    ChangePpvMessageInput,
    CreatePpvMessageInput,
} from '../generated/graphql';

class PPVMessageService {
    private model: typeof PPVMessageModel = PPVMessageModel;

    async getById(id: string) {
        try {
            return await this.model.findById(id);
        } catch (err) {
            elevateError(err);
        }
    }

    async getOnePPVMessage(token: string, pPVMessageId: string) {
        try {
            const pPVMessage = (await this.getById(
                pPVMessageId
            )) as IPPVMessage;

            await checkCreatorOwner(token, pPVMessage.creatorId.toString());

            return pPVMessage;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllPPVMessage(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            return await this.model.find({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    async createPPVMessage(token: string, input: CreatePpvMessageInput) {
        try {
            await validateCreatePpvMessage(input);
            await checkCreatorOwner(token, input.creatorId);

            return await this.model.create({
                ...input,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changePPVMessage(token: string, input: ChangePpvMessageInput) {
        try {
            await validateChangePpvMessage(input);
            const pPVMessage = (await this.getById(input.id)) as IPPVMessage;
            await checkCreatorOwner(token, pPVMessage.creatorId.toString());

            return await this.model.findOneAndUpdate(
                { _id: input.id },
                {
                    ...input,
                },
                { new: true }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async deletePPVMessage(token: string, pPVMessageId: string) {
        try {
            const pPVMessage = (await this.getById(
                pPVMessageId
            )) as IPPVMessage;
            await checkCreatorOwner(token, pPVMessage.creatorId.toString());

            return await this.model.deleteOne({ _id: pPVMessageId });
        } catch (err) {
            elevateError(err);
        }
    }

    async deletePpvMessagesByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    async getMessagesList(
        user_id: string,
        statConnection: mongoose.Connection
    ) {
        try {
            const MessageItemModelObj = MessageModel(statConnection);
            const items = await MessageItemModelObj.find({
                user_id,
            });

            return items.map((item) => {
                const message = item.toObject();
                const processedMedia = message.OF_message.media.map(
                    (mediaId) => ({
                        id: mediaId,
                    })
                );

                return {
                    ...message,
                    OF_message: {
                        ...message.OF_message,
                        media: processedMedia,
                    },
                };
            });
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

const ppvMessageService = new PPVMessageService();
export default ppvMessageService;
