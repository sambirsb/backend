import * as yup from 'yup';
import { ChangeDisplaySettingsInput } from '../generated/graphql';

const changeDisplaySettingsSchema = yup.object({
    id: yup.string().required('Display ID is required'),
    audioId: yup.string(),
    audioVolume: yup
        .number()
        .min(0, 'Minimum numbers is 0')
        .max(100, 'Maximum numbers is 100'),
    emojis: yup.string(),
    emojiStatus: yup.boolean(),
});

export async function validateChangeDisplaySettings(
    input: ChangeDisplaySettingsInput
) {
    try {
        await changeDisplaySettingsSchema.validate(input, {
            abortEarly: false,
        });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}
