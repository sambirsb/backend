import mongoose, { Schema } from 'mongoose';
import { IScriptFolder } from '../types';

const scriptFolderModel: Schema = new Schema<IScriptFolder>({
    folderName: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true,
    },
});

const ScriptFolderModel = mongoose.model<
    IScriptFolder,
    mongoose.Model<IScriptFolder>
>('ScriptFolder', scriptFolderModel);
export default ScriptFolderModel;
