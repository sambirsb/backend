import * as yup from 'yup';
import { VisibilityInput } from '../generated/graphql';

const createVisibilitySchema = yup.object().shape({
    creatorId: yup.string().required('Creator ID is required'),
    showScripts: yup.boolean(),
    showFanDetails: yup.boolean(),
    showGlobalInfo: yup.boolean(),
    showFanSpending: yup.boolean(),
});

const updateVisibilitySchema = yup.object().shape({
    id: yup.string().required('Visibility ID is required'),
    creatorId: yup.string().required('Creator ID is required'),
    showScripts: yup.boolean(),
    showFanDetails: yup.boolean(),
    showGlobalInfo: yup.boolean(),
    showFanSpending: yup.boolean(),
});

export async function validateCreateVisibility(input: VisibilityInput) {
    await createVisibilitySchema.validate(input, { abortEarly: false });
}

export async function validateUpdateVisibility(input: VisibilityInput) {
    await updateVisibilitySchema.validate(input, { abortEarly: false });
}
