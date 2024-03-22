import * as yup from 'yup';
import {
    CreatePpvMessageInput,
    ChangePpvMessageInput,
} from '../generated/graphql';

const createPpvMessageSchema = yup.object({
    creatorId: yup.string().required('Creator ID is required'),
    text: yup.string().required('Text is required'),
    fallbackName: yup.string().required('Fallback name is required'),
    media: yup.array().of(yup.string()),
});

const changePpvMessageSchema = yup.object({
    id: yup.string().required('Message ID is required'),
    text: yup.string(),
    fallbackName: yup.string(),
    media: yup.array().of(yup.string()),
});

export async function validateCreatePpvMessage(input: CreatePpvMessageInput) {
    await createPpvMessageSchema.validate(input, { abortEarly: false });
}

export async function validateChangePpvMessage(input: ChangePpvMessageInput) {
    await changePpvMessageSchema.validate(input, { abortEarly: false });
}
