// builtin

// external
import type { FastifyInstance } from "fastify";

// internal
import { handleNewThought, type NewThoughtRequest } from "./handlers/new-thought-handler.js";
import type { BaseReply } from "./globals/types.js";
import { handleDeleteThought, type DeleteThoughtRequest } from "./handlers/delete-thought-handler.js";


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
    server.post<{
        Body: NewThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", async (req, res) => {
        const reply = await packageResponse(handleNewThought, req.body);
        res.status(200).send(reply);
    });

    server.delete<{
        Body: DeleteThoughtRequest;
        Reply: BaseReply<void>;
    }>("/thoughts", async (req, res) => {
        const reply = await packageResponse(handleDeleteThought, req.body);
        res.status(200).send(reply);
    });
}