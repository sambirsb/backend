import * as yup from 'yup';
import { CreatePPVFollowInput } from '../services/pPVFollowService';
import { ChangePpvFollowInput } from '../generated/graphql';

const createPPVFollowSchema = yup.object({
    creatorId: yup.string().required('Creator ID is required'),
    active: yup.boolean().optional(),
    include: yup.boolean().optional(),
    time: yup.number().positive().integer().optional(),
});

const changePPVFollowSchema = yup.object({
    id: yup.string().required('PPVFollow ID is required'),
    active: yup.boolean().optional(),
    include: yup.boolean().optional(),
    time: yup.number().positive().integer().optional(),
});

export async function validateCreatePPVFollow(input: CreatePPVFollowInput) {
    await createPPVFollowSchema.validate(input, { abortEarly: false });
}

export async function validateChangePPVFollow(input: ChangePpvFollowInput) {
    await changePPVFollowSchema.validate(input, { abortEarly: false });
}
