import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

import { createTable } from "../create-table";
import { workspace } from "./workspace";

export const youtube = createTable("youtube", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  created_at: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: int("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .notNull(),
  workspace_id: text("workspace_id")
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
  refresh_token: text("refresh_token").notNull(),
  access_token: text("access_token").notNull(),
});
