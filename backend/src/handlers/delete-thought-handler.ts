// builtin

// external

// internal
import type { FastifySchema } from "fastify";
import { database } from "../modules/database/index.js";


export interface DeleteThoughtRequest {
    userId: string;
    thoughtId: number;
}

export async function handleDeleteThought(req: DeleteThoughtRequest): Promise<void> {

    const process = await database.deleteThought(req);

    if (!process.success) {
        throw process.error;
    }
}

export const deleteThoughtSchema: FastifySchema = {
    body: {
        type: "object",
        required: ["userId", "thoughtId"],
        properties: {
            userId: { type: "string" },
            thoughtId: { type: "number" },
        },
    }
};