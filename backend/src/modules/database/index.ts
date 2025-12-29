// builtin

// external

// internal
import type { Database } from "./database.js";
import { SupabaseDatabase } from "./implementations/actual/supabase.js";
import { TestDatabase } from "./implementations/test/test-database.js";


let database: Database;

if (process.env.NODE_ENV === "test") {
    console.log("Using test database");
    database = new TestDatabase();
} else {
    console.log("Using Supabase");
    database = new SupabaseDatabase();
}

export { database };