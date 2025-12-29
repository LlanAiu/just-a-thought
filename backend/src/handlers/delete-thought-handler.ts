// builtin

// external
import type { FastifySchema } from "fastify";

// internal
import { database } from "../modules/database/index.js";
import type { Task } from "../globals/types.js";


export interface DeleteThoughtRequest {
    userId: string;
    thoughtId: number;
}

export async function handleDeleteThought(req: DeleteThoughtRequest): Promise<Task> {
    return await database.deleteThought(req);
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