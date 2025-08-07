// builtin

// external

// internal
import type { Task, Process } from "../../../../globals/types.js";
import type { DeleteThoughtRequest } from "../../../../handlers/delete-thought-handler.js";
import type { NewThoughtRequest } from "../../../../handlers/new-thought-handler.js";
import type { Database } from "../../database.js";
import type { Thought } from "../../types.js";


export class TestDatabase implements Database {

    addThought(req: NewThoughtRequest): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    getThoughtsForUserId(userId: string): Promise<Process<Thought[]>> {
        throw new Error("Method not implemented.");
    }
    getThoughtById(id: number): Promise<Process<Thought>> {
        throw new Error("Method not implemented.");
    }
    deleteThought(req: DeleteThoughtRequest): Promise<Task> {
        throw new Error("Method not implemented.");
    }

}