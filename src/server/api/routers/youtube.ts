import { z } from "zod";

import { Youtube } from "~/lib/youtube";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const youtubeRouter = createTRPCRouter({
  generateAuthUrl: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx: { db } }) => {
      const state = crypto.randomUUID();
      await db
        .insertInto("oauth_state")
        .values({ workspace_id: id, state })
        .execute();
      return Youtube.getAuthorizationUrl(state, id);
    }),
});
