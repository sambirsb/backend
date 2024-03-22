import { AxiosError } from 'axios';
import { elevateError } from './elevateError';

export const catchAxios401Error = (err: unknown) => {
    const error = err as AxiosError;
    if (error.response && error.response.status === 401) {
        console.log('Request failed with status code 401: Unauthorized');
        return null;
    } else {
        elevateError(err);
    }
};
