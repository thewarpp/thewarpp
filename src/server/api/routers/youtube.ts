import crypto from "crypto";
import { google } from "googleapis";
import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const scopes = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
];

export const youtubeRouter = createTRPCRouter({
  generateAuthUrl: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx: { db } }) => {
      const state = crypto.randomBytes(32).toString("hex");

      await db
        .insertInto("oauth_state")
        .values({
          workspace_id: id,
          state,
        })
        .execute();

      // oauth google client
      const oauth2Client = new google.auth.OAuth2(
        env.YOUR_CLIENT_ID,
        env.YOUR_CLIENT_SECRET,
        env.YOUR_REDIRECT_URL,
      );

      // Generate a url that asks permissions for the Drive activity scope
      const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        state: `${state}-temp_separator-${id}`,
      });

      return authorizationUrl;
    }),
});
