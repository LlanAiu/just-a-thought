// builtin

// external

// internal
import type { Database } from "./database.js";
import { TestDatabase } from "./implementations/test/test-database.js";


export const database: Database = new TestDatabase();