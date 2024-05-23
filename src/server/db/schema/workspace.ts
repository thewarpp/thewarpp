import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

import { createTable } from "../create-table";

export const workspace = createTable("workspace", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  created_at: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: int("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .notNull(),
  name: text("name").notNull(),
});
