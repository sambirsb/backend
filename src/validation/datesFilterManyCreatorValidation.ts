import * as yup from 'yup';
import { DatesFilterManyCreatorIdsInput } from '../generated/graphql';

const getTodayDateEndOfDay = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    console.log(today.toISOString())
    return today;
};

const datesFilterManyCreatorIdsInputSchema = yup.object().shape({
    startDate: yup
        .date()
        .required('startDate is required')
        .max(yup.ref('endDate'), 'startDate must be earlier than endDate'),
    endDate: yup
        .date()
        .required('endDate is required'),
    creatorIds: yup
        .array()
        .of(yup.string().required('creatorId is required'))
        .required('At least one creatorId is required'),
});

export const validateDatesFilterCreatorIdsInput = async (
    input: DatesFilterManyCreatorIdsInput
) => {
    await datesFilterManyCreatorIdsInputSchema.validate(input);
};
