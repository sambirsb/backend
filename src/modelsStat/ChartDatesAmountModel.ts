import mongoose, { Schema } from 'mongoose';
import { ChartDatesAmount } from '../typesStat/ChartDatesAmount';

const chartAmountAllSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
        },
        subscribes: {
            type: Number,
            required: true,
            default: 0,
        },
        tips: {
            type: Number,
            required: true,
            default: 0,
        },
        post: {
            type: Number,
            required: true,
            default: 0,
        },
        chat_messages: {
            type: Number,
            required: true,
            default: 0,
        },
        ref: {
            type: Number,
            required: true,
            default: 0,
        },
        stream: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { _id: false }
);

const chartDatesAmountSchema = new Schema<ChartDatesAmount>(
    {
        user_id: {
            type: String,
            required: true,
        },
        chartAmountAll: [chartAmountAllSchema],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ChartDatesAmountModel = (connection: mongoose.Connection) => {
    return connection.model('chart_dates_amount', chartDatesAmountSchema);
};

export default ChartDatesAmountModel;
