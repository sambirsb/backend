import * as yup from 'yup';
import {
    CreateScriptFolderInput,
    UpdateScriptFolderInput,
} from '../generated/graphql';

const createScriptFolderSchema = yup.object({
    folderName: yup.string().required('Folder name is required'),
    creatorId: yup.string().required('Creator ID is required'),
});

const updateScriptFolderSchema = yup.object({
    id: yup.string().required('ID is required'),
    folderName: yup.string(),
    creatorId: yup.string().required('Creator ID is required'),
});

export async function validateCreateScriptFolder(
    input: CreateScriptFolderInput
) {
    await createScriptFolderSchema.validate(input, { abortEarly: false });
}

export async function validateUpdateScriptFolder(
    input: UpdateScriptFolderInput
) {
    await updateScriptFolderSchema.validate(input, { abortEarly: false });
}
