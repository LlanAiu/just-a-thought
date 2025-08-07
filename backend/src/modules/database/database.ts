// builtin

// external

// internal
import type { Process, Task } from "../../globals/types.js";
import type { DeleteThoughtRequest } from "../../handlers/delete-thought-handler.js";
import type { NewThoughtRequest } from "../../handlers/new-thought-handler.js";
import type { Thought } from "./types.js";


interface ThoughtDB {
    addThought(req: NewThoughtRequest): Promise<Task>;

    getThoughtsForUserId(userId: string): Promise<Process<Thought[]>>;

    getThoughtById(id: number): Promise<Process<Thought>>;

    deleteThought(req: DeleteThoughtRequest): Promise<Task>;
}

export interface Database extends ThoughtDB { }