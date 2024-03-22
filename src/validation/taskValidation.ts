import * as Yup from 'yup';
import { Types } from 'mongoose';
import {
    ChangeTaskInput,
    CreateTaskInput,
    DatesFilterInput,
    GetMyTeamTasks,
} from '../generated/graphql';

const validateDates = Yup.object()
    .shape({
        startDate: Yup.date().nullable(),
        endDate: Yup.date().nullable(),
    })
    .test(
        'dates-relationship',
        'EndDate must be greater than StartDate when both dates are provided.',
        function (values) {
            const { startDate, endDate } = values;

            if (!startDate || !endDate) return true;

            return startDate < endDate;
        }
    );

const validateGetMyTeamTasks = Yup.object()
    .shape({
        startDate: Yup.date().required(),
        endDate: Yup.date().required(),
        ownerId: Yup.string().required(),
    })
    .test(
        'dates-relationship',
        'EndDate must be greater than StartDate.',
        function (values) {
            const { startDate, endDate } = values;

            return startDate < endDate;
        }
    );

const createTaskInputSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    note: Yup.string(),
    performerIds: Yup.array()
        .of(
            Yup.string().test(
                'isValidObjectId',
                '${path} is not a valid MongoDB ObjectId',
                (value) =>
                    typeof value === 'string' && Types.ObjectId.isValid(value)
            )
        )
        .required('At least one performer ID is required.'),
    startDate: Yup.date().min(
        new Date(),
        'StartDate must be today or in the future.'
    ),
    endDate: Yup.date().required('EndDate is required.'),
});

const changeTaskInputSchema = Yup.object().shape({
    title: Yup.string(),
    note: Yup.string(),
    performerIds: Yup.array()
        .of(
            Yup.string().test(
                'isValidObjectId',
                '${path} is not a valid MongoDB ObjectId',
                (value) =>
                    typeof value === 'string' && Types.ObjectId.isValid(value)
            )
        )
        .required('At least one performer ID is required.'),
    startDate: Yup.date(),
    endDate: Yup.date(),
});

const validateDateRelationship = (input: CreateTaskInput) => {
    if (!input.startDate && input.endDate) {
        const endDate = new Date(input.endDate);
        if (endDate < new Date()) {
            throw new Error(
                'EndDate must be today or in the future if StartDate is not provided.'
            );
        }
    }
};

export const validateCreateTaskInput = async (input: CreateTaskInput) => {
    await createTaskInputSchema.validate(input, { abortEarly: false });
    validateDateRelationship(input);
};

export const validateChangeTaskInput = async (input: ChangeTaskInput) => {
    await changeTaskInputSchema.validate(input, { abortEarly: false });
};

export const validateDatesFilterInput = async (input: DatesFilterInput) => {
    await validateDates.validate(input, { abortEarly: false });
};

export const validateGetMyTeamTasksInput = async (input: GetMyTeamTasks) => {
    await validateGetMyTeamTasks.validate(input, { abortEarly: false });
};
