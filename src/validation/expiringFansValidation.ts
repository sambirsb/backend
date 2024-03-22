import * as yup from 'yup';
import { ChangeExpiringFansInput } from '../generated/graphql';

const changeExpiringFansSchema = yup.object({
    id: yup.string().required('ExpiringFans ID is required'),
    active: yup.boolean(),
    messageTiming: yup
        .number()
        .min(0, 'Minimum message timing is 0')
        .max(1000000, 'Maximum message timing is 1000000'),
    spendingLimitation: yup.boolean(),
    spendingLimitationSum: yup
        .number()
        .min(0, 'Minimum time limitation is 0')
        .max(1000000, 'Maximum time limitation is 1000000'),
    timeLimitation: yup
        .number()
        .min(0, 'Minimum time limitation is 0')
        .max(1000000, 'Maximum time limitation is 1000000'),
});

export async function validateChangeExpiringFansValidation(
    input: ChangeExpiringFansInput
) {
    try {
        await changeExpiringFansSchema.validate(input, { abortEarly: false });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}
