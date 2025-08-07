// builtin

// external

// internal
import type { Task, Process } from "../../../../globals/types.js";
import type { DeleteThoughtRequest } from "../../../../handlers/delete-thought-handler.js";
import type { NewThoughtRequest } from "../../../../handlers/new-thought-handler.js";
import type { Database } from "../../database.js";
import type { Thought } from "../../types.js";


export class TestDatabase implements Database {
    private thoughts: Thought[] = [];
    private nextId = 1;

    async addThought(req: NewThoughtRequest): Promise<Task> {
        const thought: Thought = {
            id: this.nextId,
            userId: req.userId,
            text: req.text,
            created: new Date().toISOString(),
        };
        this.thoughts.push(thought);
        this.nextId++;
        return { success: true };
    }

    async getThoughtsForUserId(userId: string): Promise<Process<Thought[]>> {
        const userThoughts = this.thoughts.filter(t => t.userId === userId);
        return { success: true, data: userThoughts };
    }

    async getThoughtById(id: number): Promise<Process<Thought>> {
        const thought = this.thoughts.find(t => t.id === id);
        if (thought) {
            return { success: true, data: thought };
        } else {
            return { success: false, error: new Error("Thought not found") };
        }
    }

    async deleteThought(req: DeleteThoughtRequest): Promise<Task> {
        this.thoughts = this.thoughts.filter(t => t.id !== req.thoughtId);
        return { success: true };
    }
}