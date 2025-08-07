// builtin

import { database } from "../modules/database/index.js";

// external

// internal

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