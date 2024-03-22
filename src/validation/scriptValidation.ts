import * as yup from 'yup';
import { CreateScriptInput, UpdateScriptInput } from '../generated/graphql';

const createScriptSchema = yup.object({
    scriptFolder: yup.string().required('Script folder ID is required'),
    name: yup.string().required('Script name is required'),
    text: yup.string().required('Script text is required'),
    fallbackName: yup.string().required('Fallback name is required'),
    customName: yup.string(),
    fanName: yup.string(),
});

const updateScriptSchema = yup.object({
    id: yup.string().required('Script ID is required'),
    scriptFolder: yup.string(),
    name: yup.string(),
    text: yup.string(),
    fallbackName: yup.string(),
});

export async function validateCreateScript(input: CreateScriptInput) {
    await createScriptSchema.validate(input, { abortEarly: false });
}

export async function validateUpdateScript(input: UpdateScriptInput) {
    await updateScriptSchema.validate(input, { abortEarly: false });
}
