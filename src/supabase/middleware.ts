import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { eq, or } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { env } from "~/env";
import { getDb } from "~/server/db";
import { account, workspace as workspaceSchema } from "~/server/db/schema";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();

  if (
    request.nextUrl.pathname.includes("auth/confirm") ||
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.includes("youtube/callback") ||
    request.nextUrl.pathname.includes("trpc")
  ) {
    return response;
  }

  const redirectUrl = request.nextUrl.clone();
  if (request.nextUrl.pathname.includes("auth") && data.user?.id) {
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (!request.nextUrl.pathname.includes("auth") && !data.user?.id) {
    redirectUrl.pathname = "/auth/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (request.nextUrl.pathname.includes("workspace")) {
    const uuid = request.nextUrl.pathname.split("/")[2]!;
    const db = getDb();
    const workspace = await db
      .select({ name: workspaceSchema.name })
      .from(workspaceSchema)
      .innerJoin(account, eq(workspaceSchema.id, account.workspace_id))
      .where(
        or(eq(account.user_id, data.user!.id), eq(workspaceSchema.id, uuid)),
      )
      .get();

    if (!workspace?.name) {
      return NextResponse.redirect("/not-found");
    }
  }

  return response;
}
