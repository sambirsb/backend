import * as yup from 'yup';
import {
    ChangeMassMessageInput,
    CreateMassMessageInput,
    CreateMassMessageInputForMessaging,
    InputMaybe,
} from '../generated/graphql';

const createMassMessageSchema = yup.object({
    massMess: yup.string().required('Mass Messaging ID is required'),
    text: yup.string().required('Text is required'),
    fallbackName: yup.string().required('Fallback name is required'),
    media: yup.array().of(yup.string()).optional(),
});

const createMassMessageForMessagingSchema = yup.array().of(
    yup.object().shape({
        text: yup.string().required('Text is required'),
        fallbackName: yup.string().required('Fallback name is required'),
        media: yup.array().of(yup.string()).optional(),
    })
);
const changeMassMessageSchema = yup.object({
    id: yup.string().required('Mass Message ID is required'),
    text: yup.string().optional(),
    fallbackName: yup.string().optional(),
    media: yup.array().of(yup.string()).optional(),
});

export async function validateCreateMassMessage(input: CreateMassMessageInput) {
    await createMassMessageSchema.validate(input, { abortEarly: false });
}

export async function validateCreateMassMessageForMessaging(
    input: Array<InputMaybe<CreateMassMessageInputForMessaging>>
) {
    await createMassMessageForMessagingSchema.validate(input, {
        abortEarly: false,
    });
}

export async function validateChangeMassMessage(input: ChangeMassMessageInput) {
    await changeMassMessageSchema.validate(input, { abortEarly: false });
}
