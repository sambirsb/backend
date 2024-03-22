import * as yup from 'yup';
import {
    ChangeFanSpendListsInput,
    CreateFanSpendListsInput,
} from '../generated/graphql';

const ChangeFanSpendListsSchema = yup.object({
    id: yup.string().required('Fan Spend Lists ID is required'),
    creatorId: yup.string().required('Creator ID is required'),
    minSpend: yup
        .number()
        .min(0, 'Minimum numbers is 0')
        .max(1000000, 'Maximum numbers is 1 000 000'),
    maxSpend: yup
        .number()
        .min(0, 'Minimum numbers is 0')
        .max(1000000, 'Maximum numbers is 1 000 000')
        .test(
            'is-greater',
            'maxSpend must be greater than minSpend',
            function (this: yup.TestContext, value?: number) {
                const { minSpend } = this.parent;
                return value! > minSpend;
            }
        ),
    name: yup.string().required(),
    includeExpired: yup.boolean().required(),
});

const CreateFanSpendListsSchema = yup.object({
    creatorId: yup.string().required('Creator ID is required'),
    minSpend: yup
        .number()
        .min(0, 'Minimum numbers is 0')
        .max(1000000, 'Maximum numbers is 1 000 000'),
    maxSpend: yup
        .number()
        .min(0, 'Minimum numbers is 0')
        .max(1000000, 'Maximum numbers is 1 000 000')
        .test(
            'is-greater',
            'maxSpend must be greater than minSpend',
            function (this: yup.TestContext, value?: number) {
                const { minSpend } = this.parent;
                return value! > minSpend;
            }
        ),
    name: yup.string().required(),
    includeExpired: yup.boolean().required(),
});

export async function validateChangeFanSpendLists(
    input: ChangeFanSpendListsInput
) {
    try {
        await ChangeFanSpendListsSchema.validate(input, { abortEarly: false });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}

export async function validateCreateFanSpendLists(
    input: CreateFanSpendListsInput
) {
    try {
        await CreateFanSpendListsSchema.validate(input, { abortEarly: false });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}
