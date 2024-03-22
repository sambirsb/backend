import * as yup from 'yup';
import {
    AddTeamMemberInput,
    ChangeTeamMemberInput,
} from '../generated/graphql';

const permissionInputSchema = yup.object().shape({
    creatorId: yup.string().required('Creator ID is required'),
    modifyCreatorSettings: yup.boolean(),
    seeChatterTracking: yup.boolean(),
    seeCreatorStats: yup.boolean(),
    setupMassMessages: yup.boolean(),
    startOFProfile: yup.boolean(),
});

const addTeamMemberInputSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    name: yup
        .string()
        .required()
        .max(50, 'Name must be less than or equal to 50 characters'),
    note: yup
        .string()
        .nullable()
        .max(200, 'Note must be less than or equal to 200 characters'),
    ownerId: yup.string().required('Owner ID is required'),
    permissions: yup
        .array()
        .of(permissionInputSchema)
        .required('Permissions are required'),
});

const changeTeamMemberInputSchema = yup.object().shape({
    name: yup.string(),
    note: yup.string(),
    permissions: yup.array().of(permissionInputSchema),
});

export async function validateAddTeamMemberInput(input: AddTeamMemberInput) {
    await addTeamMemberInputSchema.validate(input, { abortEarly: false });
}

export async function validateChangeTeamMemberInput(
    input: ChangeTeamMemberInput
) {
    await changeTeamMemberInputSchema.validate(input, { abortEarly: false });
}
