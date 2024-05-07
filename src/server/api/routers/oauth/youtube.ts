import crypto from "crypto";
import { cookies } from "next/headers";
import { z } from "zod";

import { oauth2Client, youtubeOauthCookiesKey } from "~/server/constants";

import { createTRPCRouter, privateProcedure } from "../../trpc";

export const youtubeRouter = createTRPCRouter({
  authorize: privateProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      }),
    )
    .mutation(async ({ input: { workspaceId } }) => {
      const scopes = [
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube.readonly",
      ];

      const state = crypto.randomBytes(32).toString("hex");
      const cookiesStore = cookies();
      cookiesStore.set(youtubeOauthCookiesKey, state);

      // Generate a url that asks permissions for the Drive activity scope
      const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        state: `${state}-temp_separator-${workspaceId}`,
      });

      return authorizationUrl;
    }),
});
