import { AxiosError } from 'axios';
import { elevateError } from './elevateError';

export const catchAxios400Error = (err: unknown) => {
    const error = err as AxiosError;

    if (error.response && error.response.status === 400) {
        console.log(
            `Request to ${error.config.url} failed with status code 400: Bad request.`
        );

        return null;
    } else {
        elevateError(err);
    }
};
