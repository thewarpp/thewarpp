import { type NextRequest,NextResponse } from "next/server";

import { oauth2Client } from "~/server/constants";
import { db } from "~/server/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  try {
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

    if (!state || !workspaceId) {
      // Check state for CSRF protection
      console.error("State mismatch. Possible CSRF attack");
      return new Response("Error during OAuth flow", {
        status: 400,
      });
    }

    const oauthState = await db
      .selectFrom("oauth_state")
      .select(["state", "id"])
      .where("workspace_id", "=", workspaceId!)
      .executeTakeFirst();

    if (!oauthState?.state || state !== oauthState.state) {
      // Check state for CSRF protection
      console.error("State mismatch. Possible CSRF attack");
      return new Response("Error during OAuth flow", {
        status: 400,
      });
    }

    // Exchange authorization code for tokens
    const [{ tokens }] = await Promise.all([
      oauth2Client.getToken(code!),
      db.deleteFrom("oauth_state").where("id", "=", oauthState.id).execute(),
    ]);

    oauth2Client.setCredentials(tokens);

    // **Security: Store refresh token securely (avoid global variables)**
    // - Consider using a secure database like MongoDB or a key-value store
    // - Implement proper access control mechanisms
    // Example usage (replace with your actual logic)
    await db
      .insertInto("youtube")
      .values({
        updated_at: new Date(),
        refresh_token: tokens.refresh_token!,
        access_token: tokens.access_token!,
        workspace_id: workspaceId,
      })
      .execute();

    return NextResponse.redirect(
      `workspace/${workspaceId}/settings/connections`,
    );
  } catch (error) {
    console.log("error");
    console.log(error);
    return NextResponse.json({ ok: "ok" });
  }
}
