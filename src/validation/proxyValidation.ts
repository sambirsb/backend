import * as yup from 'yup';
import { ChooseHttpProxyInput } from '../generated/graphql';

const baseProxySchema = yup.object({
    host: yup.string().required('Host is required'),
    port: yup.string().required('Port is required'),
    userName: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const chooseHttpProxySchema = baseProxySchema.shape({
    creatorId: yup.string().required('CreatorId is required'),
});

export async function validateChooseHttpProxy(input: ChooseHttpProxyInput) {
    await chooseHttpProxySchema.validate(input, { abortEarly: false });
}
