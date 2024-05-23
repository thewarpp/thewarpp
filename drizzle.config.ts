import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema/index.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    token: env.D1_TOKEN,
    accountId: env.D1_ACCOUNT_ID,
    databaseId: env.DATABASE_ID,
  },
  strict: true,
  tablesFilter: ["thewarpp_*"],
} satisfies Config;
