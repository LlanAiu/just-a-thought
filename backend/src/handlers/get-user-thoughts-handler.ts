// builtin

// external

// internal
import type { Process } from "../globals/types.js";
import { database } from "../modules/database/index.js";
import type { Thought } from "../modules/database/types.js";


export interface GetUserThoughtsRequest {
    userId: string;
}

export async function handleGetUserThoughts(query: GetUserThoughtsRequest): Promise<Process<Thought[]>> {
    const { userId } = query;

    return await database.getThoughtsForUserId(userId);
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