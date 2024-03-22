import * as yup from 'yup';
import { GraphQLError } from 'graphql/error';

const addVaultMediaSchema = yup.object({
    media_id: yup.string().required('Media ID is required'),
    fileName: yup.string().required('File name is required'),
    price: yup.number().min(0).max(1000000).required('Price is required'),
    creatorId: yup.string().required('Creator ID is required'),
    scriptId: yup.string(),
    createdBy: yup.string().required('Created by is required'),
});

export const validateVaultMediaExtInput = async (input: any) => {
    try {
        await addVaultMediaSchema.validate(input, { abortEarly: false });
    } catch (err) {
        throw new GraphQLError((err as yup.ValidationError).message);
    }
};
