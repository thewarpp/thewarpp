import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

import { createTable } from "../create-table";
import { user } from "./user";
import { workspace } from "./workspace";

export const account = createTable("account", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  created_at: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: int("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .notNull(),
  type: text("type", { enum: ["CREATOR", "EDITOR"] })
    .default("CREATOR")
    .notNull(),
  user_id: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  workspace_id: text("workspace_id")
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
});
