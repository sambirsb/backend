import * as yup from 'yup';
import { ChangePromotionReactivatorInput } from '../generated/graphql';

const changeFanNumberingSchema = yup.object({
    id: yup.string().required('Promotion ID is required'),
    numbers: yup
        .number()
        .min(2, 'Minimum numbers is 2')
        .max(9, 'Maximum numbers is 9'),
    active: yup.boolean(),
});

export async function validateChangeFanNumbering(
    input: ChangePromotionReactivatorInput
) {
    try {
        await changeFanNumberingSchema.validate(input, { abortEarly: false });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}
