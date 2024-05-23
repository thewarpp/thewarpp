import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

import { createTable } from "../create-table";
import { workspace } from "./workspace";

export const oauth_state = createTable("oauth_state", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  created_at: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  state: text("state").notNull(),
  workspace_id: text("workspace_id")
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
});
