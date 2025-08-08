// builtin

// external
import type { FastifyInstance } from "fastify";

// internal
import { handleNewThought, newThoughtSchema, type NewThoughtRequest } from "./handlers/new-thought-handler.js";
import type { BaseReply } from "./globals/types.js";
import { deleteThoughtSchema, handleDeleteThought, type DeleteThoughtRequest } from "./handlers/delete-thought-handler.js";
import { getUserThoughtsSchema, handleGetUserThoughts, type GetUserThoughtsRequest } from "./handlers/get-user-thoughts-handler.js";
import type { Thought } from "./modules/database/types.js";


async function packageResponse<I, O>(
    handler: (body: I) => Promise<O>,
    body: I,
): Promise<BaseReply<O>> {
    try {
        const data = await handler(body);
        return { data };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export function setupRoutes(server: FastifyInstance) {
    server.get<{
        Querystring: GetUserThoughtsRequest;
        Reply: BaseReply<Thought[]>;
    }>("/thoughts", { schema: getUserThoughtsSchema }, async (req, res) => {
        const reply = await packageResponse(handleGetUserThoughts, req.query);
        res.status(200).send(reply);
    });

    server.post<{
        Body: NewThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", { schema: newThoughtSchema }, async (req, res) => {
        const reply = await packageResponse(handleNewThought, req.body);
        res.status(200).send(reply);
    });

    server.delete<{
        Body: DeleteThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", { schema: deleteThoughtSchema }, async (req, res) => {
        const reply = await packageResponse(handleDeleteThought, req.body);
        res.status(200).send(reply);
    });
}