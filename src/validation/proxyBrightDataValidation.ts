import * as yup from 'yup';
import { IProxy } from '../types';

const proxyValidationSchema = yup.object().shape({
    host: yup
        .string()
        .min(10, 'Host must be at least 10 characters.')
        .max(100, 'Host must be at most 100 characters.')
        .required('Host is required.'),
    port: yup
        .string()
        .required('Port is required.')
        .matches(/^[0-9]+$/, 'Port must be a valid number.')
        .test('is-valid-port', 'Port must be valid (1-65535).', (value) => {
            const port = parseInt(<string>value, 10);
            return port >= 1 && port <= 65535;
        }),
    userName: yup
        .string()
        .min(10, 'Username must be at least 10 characters.')
        .required('Username is required.'),
    password: yup
        .string()
        .min(10, 'Password must be at least 10 characters.')
        .required('Password is required.'),
});

export async function validateBrightDataProxy(proxy: IProxy) {
    await proxyValidationSchema.validate(proxy, { abortEarly: false });
}
