// builtin

// external

// internal
import type { BaseReply, Process, Task, Thought } from "./types";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL) throw new Error("BACKEND URL environment variable is not set!");

export async function getAllThoughtsForUser(userId: string): Promise<Process<Thought[]>> {
    try {
        const response = await fetch(`${BACKEND_URL}/thoughts?userId=${userId}`);

        if (response.ok) {
            const json: BaseReply<Thought[]> = await response.json() as BaseReply<Thought[]>;
            const data = json.data;

            if (!data) {
                return { success: true, data: [] };
            }

            return { success: true, data };
        }

        return { success: false, error: response.statusText };

    } catch (err) {
        console.log(err);
        return { success: false, error: `Failed to fetch thought data for user ${userId}` };
    }
}

interface NewThoughtInput {
    userId: string;
    text: string;
}

export async function postNewThoughtForUser(input: NewThoughtInput): Promise<Task> {
    try {
        const response = await fetch(`${BACKEND_URL}/thoughts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });

        if (response.ok) {
            return { success: true };
        }

        return { success: false, error: response.statusText };

    } catch (err) {
        console.log(err);
        return { success: false, error: `Failed to upload new thought data for user ${input.userId}` };
    }
}