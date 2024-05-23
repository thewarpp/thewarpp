import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

import { createTable } from "../create-table";

export const user = createTable("user", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  created_at: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: int("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .notNull(),
  first_name: text("first_name", { length: 50 }).notNull(),
  last_name: text("last_name", { length: 50 }),
  email: text("email", { length: 255 }).notNull(),
});
