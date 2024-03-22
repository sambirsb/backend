import authService from '../../services/AuthService';
import scriptService from '../../services/ScriptService';
import { elevateError } from '../../errors/elevateError';
import { CreateScriptInput, UpdateScriptInput } from '../../generated/graphql';

const scriptMutationResolver = {
    Mutation: {
        async createScript(
            _: never,
            { input }: { input: CreateScriptInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const script = await scriptService.createScript(token, input);

                return {
                    message: `Script with name: ${input.name} successfully created`,
                    script,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changeScript(
            _: never,
            { input }: { input: UpdateScriptInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const script = await scriptService.changeScript(token, input);

                return {
                    message: `Script with id: ${input.id} successfully changed`,
                    script,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteScript(_: never, { id }: { id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await scriptService.deleteScript(token, id);

                return `Script with id: ${id} successfully deleted`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default scriptMutationResolver;
