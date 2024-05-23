import { db } from "~/server/db";

import { NoSocialConnection } from "./_components/no-social-connection";

export const runtime = "edge";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const youtube = await db
    .selectFrom("youtube")
    .where("workspace_id", "=", id)
    .limit(1)
    .executeTakeFirst();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {!youtube ? <NoSocialConnection id={id} /> : null}
    </main>
  );
}
