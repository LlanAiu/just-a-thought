// builtin

// external

// internal
import type { FastifySchema } from "fastify";
import { database } from "../modules/database/index.js";


export interface NewThoughtRequest {
    userId: string;
    text: string;
}

export async function handleNewThought(req: NewThoughtRequest): Promise<void> {

    const process = await database.addThought(req);

    if (!process.success) {
        throw process.error;
    }
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