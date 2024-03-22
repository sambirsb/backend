import mongoose, { Schema } from 'mongoose';
import { ProxyCountry } from '../constants/ProxyCountry';
import { ProxyType } from '../constants/proxyType';
import { IProxy } from '../types';

const proxySchema: Schema = new Schema<IProxy>(
    {
        zone: {
            country: {
                type: String,
                enum: Object.values(ProxyCountry),
                default: ProxyCountry.USA,
            },
            number: Number,
        },
        proxyType: {
            type: String,
            enum: Object.values(ProxyType),
            required: true,
        },
        host: String,
        port: String,
        userName: String,
        password: String,
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: 'Creator',
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'proxies',
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const ProxyModel = mongoose.model<IProxy, mongoose.Model<IProxy>>(
    'Proxy',
    proxySchema
);
export default ProxyModel;
