import * as yup from 'yup';
import {
    ChangeExpiringFansMessageInput,
    CreateExpiringFansMessageInput,
} from '../generated/graphql';

const createExpiringFansSchema = yup.object({
    expiringFans: yup.string().required('Welcome settings ID is required'),
    text: yup.string().required('Text is required'),
    fallbackName: yup.string().required('Fallback name is required'),
    media: yup.array().of(yup.string()),
});

const changeExpiringFansSchema = yup.object({
    id: yup.string().required('Message ID is required'),
    text: yup.string(),
    fallbackName: yup.string(),
    media: yup.array().of(yup.string()),
});

export async function validateCreateExpiringFansMessage(
    input: CreateExpiringFansMessageInput
) {
    await createExpiringFansSchema.validate(input, { abortEarly: false });
}

export async function validateChangeExpiringFansMessage(
    input: ChangeExpiringFansMessageInput
) {
    await changeExpiringFansSchema.validate(input, { abortEarly: false });
}
