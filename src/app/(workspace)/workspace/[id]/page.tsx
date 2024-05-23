import { eq } from "drizzle-orm";

import { getDb } from "~/server/db";
import { youtube as youtubeSchema } from "~/server/db/schema";

import { NoSocialConnection } from "./_components/no-social-connection";

export const runtime = "edge";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const db = getDb();
  const youtube = await db
    .select()
    .from(youtubeSchema)
    .where(eq(youtubeSchema.workspace_id, id))
    .limit(1)
    .get();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {!youtube ? <NoSocialConnection id={id} /> : null}
    </main>
  );
}
