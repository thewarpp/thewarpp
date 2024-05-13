import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";

import { env } from "~/env.js";

import type { DB } from "./types";

const dialect = new NeonDialect({
  connectionString: env.DATABASE_URL,
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
