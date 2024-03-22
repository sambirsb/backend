import * as yup from 'yup';
import { ChangePromotionReactivatorInput } from '../generated/graphql';

const changePpvMessageSchema = yup.object({
    id: yup.string().required('Promotion ID is required'),
    period: yup
        .number()
        .min(1, 'Minimum period is 1')
        .max(30, 'Maximum period is 30'),
    active: yup.boolean(),
});

export async function validateChangePromotionReactivator(
    input: ChangePromotionReactivatorInput
) {
    try {
        await changePpvMessageSchema.validate(input, { abortEarly: false });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}
