// builtin

// external
import type { FastifyInstance, FastifyReply } from "fastify";

// internal
import { handleNewThought, newThoughtSchema, type NewThoughtRequest } from "./handlers/new-thought-handler.js";
import type { BaseReply, Process, ReplyConfig } from "./globals/types.js";
import { deleteThoughtSchema, handleDeleteThought, type DeleteThoughtRequest } from "./handlers/delete-thought-handler.js";
import { getUserThoughtsSchema, handleGetUserThoughts, type GetUserThoughtsRequest } from "./handlers/get-user-thoughts-handler.js";
import type { Thought } from "./modules/database/types.js";


async function packageResponse<O>(
    handler: () => Promise<Process<O>>,
): Promise<ReplyConfig<O>> {
    const result = await handler();

    if (result.success) {
        return {
            reply: { ...result },
            code: 200
        };
    }

    if (result.code !== undefined) {
        return {
            reply: {
                success: false,
                error: result.error.name,
                message: result.error.message,
            },
            code: result.code
        };
    }

    throw result.error;
}

export function setupRoutes(server: FastifyInstance) {
    server.post<{
        Body: NewThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", { schema: getUserThoughtsSchema }, async (req, res) => {
        const { reply, code } = await packageResponse(() => handleNewThought(req.body));
        res.status(code).send(reply);
    });

    server.get<{
        Querystring: GetUserThoughtsRequest;
        Reply: BaseReply<Thought[]>;
    }>("/thoughts", { schema: getUserThoughtsSchema }, async (req, res) => {
        const { reply, code } = await packageResponse(() => handleGetUserThoughts(req.query));
        res.status(code).send(reply);
    });

    server.delete<{
        Body: DeleteThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", { schema: deleteThoughtSchema }, async (req, res) => {
        const { reply, code } = await packageResponse(() => handleDeleteThought(req.body));
        res.status(code).send(reply);
    });
}