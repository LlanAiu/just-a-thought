// builtin

import { database } from "../modules/database/index.js";

// external

// internal

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