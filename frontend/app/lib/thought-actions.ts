// builtin

// external

// internal
import type { BaseReply, Task, Thought } from "./types";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL) throw new Error("BACKEND URL environment variable is not set!");

export async function getAllThoughtsForUser(userId: string): Promise<BaseReply<Thought[]>> {
    try {
        const response = await fetch(`${BACKEND_URL}/thoughts?userId=${userId}`);

        const data: BaseReply<Thought[]> = await response.json() as BaseReply<Thought[]>;
        return data;

    } catch (err) {
        console.log(err);
        return {
            success: false,
            error: "Faild to fetch",
            message: `Failed to fetch thought data for user ${userId}`
        };
    }
}

interface NewThoughtInput {
    userId: string;
    text: string;
}

export async function postNewThoughtForUser(input: NewThoughtInput): Promise<BaseReply<void>> {
    try {
        const response = await fetch(`${BACKEND_URL}/thoughts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });

        if (response.ok) {
            const data: BaseReply<void> = await response.json() as BaseReply<void>;

            return data;
        }

        return {
            success: false,
            error: "Failed to fetch",
            message: response.statusText
        };

    } catch (err) {
        return {
            success: false,
            error: "Faild to fetch",
            message: `Failed to create new thought with input: ${JSON.stringify(input)}`
        };
    }
}