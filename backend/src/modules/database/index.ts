// builtin

import type { Database } from "./database.js";
import { TestDatabase } from "./implementations/test/testDatabase.js";

// external

// internal


export const database: Database = new TestDatabase();