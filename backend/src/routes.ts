// builtin

// external
import type { FastifyInstance, FastifyReply } from "fastify";

// internal
import { handleNewThought, newThoughtSchema, type NewThoughtRequest } from "./handlers/new-thought-handler.js";
import type { BaseReply, Process } from "./globals/types.js";
import { deleteThoughtSchema, handleDeleteThought, type DeleteThoughtRequest } from "./handlers/delete-thought-handler.js";
import { getUserThoughtsSchema, handleGetUserThoughts, type GetUserThoughtsRequest } from "./handlers/get-user-thoughts-handler.js";
import type { Thought } from "./modules/database/types.js";


async function packageResponse<O>(
    handler: () => Promise<Process<O>>,
    response: FastifyReply,
): Promise<BaseReply<O>> {
    const result = await handler();

    if (result.success) {
        return { data: result.data };
    }

    if (result.code !== undefined) {
        return response.code(result.code).send(result.error.message);
    }

    throw result.error;
}

export function setupRoutes(server: FastifyInstance) {
    server.post<{
        Body: NewThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", async (req, res) => {
        const reply = await packageResponse(() => handleNewThought(req.body), res);
        res.status(200).send(reply);
    });

    server.get<{
        Querystring: GetUserThoughtsRequest;
        Reply: BaseReply<Thought[]>;
    }>("/thoughts", { schema: getUserThoughtsSchema }, async (req, res) => {
        const reply = await packageResponse(() => handleGetUserThoughts(req.query), res);
        res.status(200).send(reply);
    });

    server.delete<{
        Body: DeleteThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", { schema: deleteThoughtSchema }, async (req, res) => {
        const reply = await packageResponse(() => handleDeleteThought(req.body), res);
        res.status(200).send(reply);
    });
}