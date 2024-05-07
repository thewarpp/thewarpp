import { google } from "googleapis";
import type { NextRequest} from "next/server";

import { oauth2Client, youtubeOauthCookiesKey } from "~/server/constants";
import { db } from "~/server/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const stateParam = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    // Handle OAuth error
    console.error("Error:", error);
    return new Response("Error during OAuth flow", {
      status: 400,
    });
  }

  const [state, workspaceId] = stateParam!.split("-temp_separator-");
  const cookiesState = request.cookies.get(youtubeOauthCookiesKey)?.value;
  if (!state || !cookiesState || !workspaceId || state !== cookiesState) {
    // Check state for CSRF protection
    console.error("State mismatch. Possible CSRF attack");
    return new Response("Error during OAuth flow", {
      status: 400,
    });
  }

  // Exchange authorization code for tokens
  const { tokens } = await oauth2Client.getToken(code!);
  oauth2Client.setCredentials(tokens);

  // **Security: Store refresh token securely (avoid global variables)**
  // - Consider using a secure database like MongoDB or a key-value store
  // - Implement proper access control mechanisms
  // Example usage (replace with your actual logic)
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const channelListResponse = await youtube.channels.list({
    mine: true,
  });
  const channel = channelListResponse.data.items![0]!;

  await db
    .insertInto("youtube")
    .values({
      updated_at: new Date(),
      refresh_token: tokens.refresh_token!,
      access_token: tokens.access_token!,
      workspace_id: workspaceId,
    })
    .execute();
}
