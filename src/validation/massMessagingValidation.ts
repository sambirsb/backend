import * as yup from 'yup';
import {
    ChangeMassMessagingInput,
    MassMessagingCreate,
} from '../generated/graphql';

const createMassMessagingSchema = yup.object({
    creatorId: yup.string().required('Creator ID is required'),
    status: yup.boolean(),
    startDate: yup.date(),
    endDate: yup.date(),
    excludeFans: yup
        .number()
        .min(0, 'Exclude Fans must be a non-negative number'),
    activeSub: yup.boolean(),
    neverChatBefore: yup.boolean(),
});

const changeMassMessagingSchema = yup.object({
    id: yup.string().required('Mass Messaging ID is required'),
    status: yup.boolean(),
    startDate: yup.date(),
    endDate: yup.date(),
    excludeFans: yup
        .number()
        .min(0, 'Exclude Fans must be a non-negative number'),
    activeSub: yup.boolean(),
    neverChatBefore: yup.boolean(),
});

export async function validateCreateMassMessaging(input: MassMessagingCreate) {
    await createMassMessagingSchema.validate(input, { abortEarly: false });
}

export async function validateChangeMassMessaging(
    input: ChangeMassMessagingInput
) {
    await changeMassMessagingSchema.validate(input, { abortEarly: false });
}
