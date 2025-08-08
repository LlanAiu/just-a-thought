// builtin

// external

// internal
import { database } from "../modules/database/index.js";
import type { Thought } from "../modules/database/types.js";


export interface GetUserThoughtsRequest {
    userId: string;
}

export async function handleGetUserThoughts(query: GetUserThoughtsRequest): Promise<Thought[]> {
    const { userId } = query;

    const process = await database.getThoughtsForUserId(userId);

    if (!process.success) {
        throw process.error;
    }

    return process.data;
}

export const getUserThoughtsSchema = {
    querystring: {
        type: "object",
        required: ["userId"],
        properties: {
            userId: { type: "string" }
        }
    }
};