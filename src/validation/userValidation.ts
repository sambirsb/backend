import * as yup from 'yup';
import { UserCreationData } from '../types';
import { GraphQLError } from 'graphql/error';
import { CreateNewPasswordInput, LoginInput } from '../generated/graphql';

const registerSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

const loginSchema = yup.object({
    login: yup.string().required('Login is required'),
    password: yup.string().required('Password is required'),
});

const newPasswordSchema = yup.object({
    oldPassword: yup.string().required('Old password is required'),
    newPassword: yup
        .string()
        .min(6, 'New password must be at least 6 characters long')
        .required('New password is required'),
});

export async function validateRegister(input: UserCreationData) {
    await registerSchema.validate(input, { abortEarly: false });
}

export async function validateLogin(input: LoginInput) {
    await loginSchema.validate(input, { abortEarly: false });
}

export async function validateNewPassword(input: CreateNewPasswordInput) {
    await newPasswordSchema.validate(input, { abortEarly: false });
}

export const emailValidate = async (email: string): Promise<void> => {
    try {
        await yup.string().email().max(100).validate(email);
    } catch (err) {
        throw new GraphQLError((err as yup.ValidationError).message);
    }
};
