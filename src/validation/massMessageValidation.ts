import * as yup from 'yup';
import {
    ChangeWelcomeMessageInput,
    CreateWelcomeMessageInput,
} from '../generated/graphql';

const createWelcomeMessageSchema = yup.object({
    welcomeSettings: yup.string().required('Welcome settings ID is required'),
    text: yup.string().required('Text is required'),
    fallbackName: yup.string().required('Fallback name is required'),
    media: yup.array().of(yup.string()),
    // fanName: yup.mixed().oneOf(Object.values(NameType)).required('Fan name is required')
});

const changeWelcomeMessageSchema = yup.object({
    id: yup.string().required('Message ID is required'),
    text: yup.string(),
    fallbackName: yup.string(),
    media: yup.array().of(yup.string()),
    // fanName: yup.mixed().oneOf(Object.values(NameType))
});

export async function validateCreateWelcomeMessage(
    input: CreateWelcomeMessageInput
) {
    await createWelcomeMessageSchema.validate(input, { abortEarly: false });
}

export async function validateChangeWelcomeMessage(
    input: ChangeWelcomeMessageInput
) {
    await changeWelcomeMessageSchema.validate(input, { abortEarly: false });
}
