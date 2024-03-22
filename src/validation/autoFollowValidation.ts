import * as yup from 'yup';
import { ChangeAutoFollowInput } from '../generated/graphql';

const changeAutoFollowSchema = yup.object({
    id: yup.string().required('Auto follow ID is required'),
    minSpend: yup
        .number()
        .min(0, 'Minimum numbers is 2')
        .max(1000000, 'Maximum numbers is 1 000 000'),
    active: yup.boolean(),
});

export async function validateChangeAutoFollow(input: ChangeAutoFollowInput) {
    try {
        await changeAutoFollowSchema.validate(input, { abortEarly: false });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}
