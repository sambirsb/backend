import * as yup from 'yup';

export async function stringLengthValidation(
    valueToValidate: string,
    minLength: number
) {
    const schema = yup.string().min(minLength).required();

    try {
        await schema.validate(valueToValidate);

        return true;
    } catch (error) {
        console.error('Validation error:', error);
        throw error;
    }
}
