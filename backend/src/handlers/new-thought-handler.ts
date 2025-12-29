// builtin

// external
import type { FastifySchema } from "fastify";

// internal
import { database } from "../modules/database/index.js";
import type { Task } from "../globals/types.js";


export interface NewThoughtRequest {
    userId: string;
    text: string;
}

export async function handleNewThought(req: NewThoughtRequest): Promise<Task> {
    return await database.addThought(req);
}

export const newThoughtSchema: FastifySchema = {
    body: {
        type: "object",
        required: ["userId", "text"],
        properties: {
            userId: { type: "string" },
            text: { type: "string" },
        }
    }
};