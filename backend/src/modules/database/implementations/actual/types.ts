// builtin

// external

// internal


export interface SupabaseTypes {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string,
                    email: string
                }
                Insert: {
                    id: string,
                    email: string
                }
                Update: {
                    id: string,
                    email: string
                }
            },
            thoughts: {
                Row: {
                    id: number,
                    user_id: string,
                    content: string,
                    created?: string | null,
                }
                Insert: {
                    id: number,
                    user_id: string,
                    content: string,
                    created?: string | null,
                }
                Update: {
                    id: number,
                    user_id: string,
                    content: string,
                    created?: string | null,
                }
            }
        }
    }
}