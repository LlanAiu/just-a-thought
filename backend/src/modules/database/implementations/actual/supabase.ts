// builtin

// external
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// internal
import type { Database } from "../../database.js";
import type { Task, Process } from "../../../../globals/types.js";
import type { DeleteThoughtRequest } from "../../../../handlers/delete-thought-handler.js";
import type { NewThoughtRequest } from "../../../../handlers/new-thought-handler.js";
import type { Thought } from "../../types.js";
import type { SupabaseTypes } from "./types.js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL) throw new Error("SUPABASE_URL environment variable not set!");
if (!SUPABASE_ANON_KEY) throw new Error("SUPABASE_ANON_KEY environment variable not set!");

const supabase: SupabaseClient = createClient<SupabaseTypes>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

export class SupabaseDatabase implements Database {
    async addThought(req: NewThoughtRequest): Promise<Task> {
        const { error } = await supabase.from('thoughts').insert(req);

        if (error) {
            return { success: false, error };
        }

        return { success: true };
    }

    async getThoughtsForUserId(userId: string): Promise<Process<Thought[]>> {
        const { data, error } = await supabase.from('thoughts').select(
            'id, userId:user_id, text:content, created'
        ).eq('user_id', userId);

        // const { data, error } = await supabase.from('thoughts').select(
        //     'id, userId:user_id, text:content, users(email)'
        // ).eq('user_id', userId);

        if (error) {
            return { success: false, error };
        }

        return { success: true, data };
    }

    async getThoughtById(id: number): Promise<Process<Thought>> {
        const { data, error } = await supabase.from('thoughts').select().eq('id', id);

        if (error) {
            return { success: false, error };
        }

        return { success: true, data: data[0] };
    }

    async deleteThought(req: DeleteThoughtRequest): Promise<Task> {
        const { error } = await supabase.from('thoughts').delete().eq('id', req.thoughtId);

        if (error) {
            return { success: false, error };
        }

        return { success: true };
    }

}