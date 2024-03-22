import { Document, Types } from 'mongoose';
import { ScriptFolder as ScriptFolderQLCreator } from '../generated/graphql';

export interface IScriptFolder
    extends Document,
        Omit<ScriptFolderQLCreator, 'id' | 'creatorId'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
}
