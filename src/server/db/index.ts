import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

export const getDb = () => {
  return drizzle(getRequestContext().env.DB, { schema });
};
