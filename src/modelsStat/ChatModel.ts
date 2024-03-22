import { Connection, Schema } from 'mongoose';
import { IChat } from '../typesStat';

const chatModel = new Schema<IChat>({
    user_id: {
        type: Schema.Types.Number,
        ref: 'public_data',
        required: true,
    },
    friend_user_id: {
        type: Schema.Types.Number,
        ref: 'public_data',
        required: true,
    },
    openChatDate: {
        type: Date,
        required: true,
    },
    hasSellingChat: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const ChatModel = (connection: Connection) => {
    return connection.model('chats', chatModel);
};

export default ChatModel;
