import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { Youtube } from "~/lib/youtube";
import { getDb } from "~/server/db";
import { oauth_state, youtube } from "~/server/db/schema";

export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";

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

    const db = getDb();
    const [oauthState] = await db
      .select({ state: oauth_state.state, id: oauth_state.id })
      .from(oauth_state)
      .limit(1)
      .where(eq(oauth_state.workspace_id, workspaceId!));

    if (!oauthState?.state || state !== oauthState.state) {
      // Check state for CSRF protection
      console.error("State mismatch. Possible CSRF attack");
      return new Response("Error during OAuth flow", {
        status: 400,
      });
    }

    const tokens = await Youtube.getTokenResponse(code!);
    // Store refresh token securely
    await Promise.all([
      db
        .insert(youtube)
        .values({
          updated_at: new Date(),
          refresh_token: tokens.refresh_token!,
          access_token: tokens.access_token!,
          workspace_id: workspaceId,
        })
        .execute(),
      db.delete(oauth_state).where(eq(oauth_state.id, oauthState.id)),
    ]);

    const url = request.nextUrl.clone();
    url.pathname = `workspace/${workspaceId}/settings/connections`;
    return NextResponse.redirect(url);
  } catch (error) {
    console.log("error");
    console.log(error);
    return NextResponse.json({ ok: "ok" });
  }
}
