import authService from '../../services/AuthService';
import scriptService from '../../services/ScriptService';
import { elevateError } from '../../errors/elevateError';

const scriptQueryResolver = {
    Query: {
        async getScriptById(_: never, { id }: { id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scriptService.getScriptById(token, id);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default scriptQueryResolver;
