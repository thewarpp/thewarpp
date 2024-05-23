import { z } from "zod";

import { Youtube } from "~/lib/youtube";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { oauth_state } from "~/server/db/schema";

export const youtubeRouter = createTRPCRouter({
  generateAuthUrl: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx: { db } }) => {
      const state = crypto.randomUUID();
      await db.insert(oauth_state).values({ workspace_id: id, state });
      return Youtube.getAuthorizationUrl(state, id);
    }),
});
