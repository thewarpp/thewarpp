import { notFound } from "next/navigation";

import { ScrollArea } from "~/components/ui/scroll-area";
import { db } from "~/server/db";

import UpdateWorkspaceName from "./_components/update-workspace-name";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const workspace = await db
    .selectFrom("workspace")
    .select(["workspace.name"])
    .executeTakeFirst();

  if (!workspace) {
    notFound();
  }

  return (
    <ScrollArea>
      <div className="grid h-full min-h-[calc(100vh_-_theme(spacing.48))] gap-6">
        <div className="h-full max-w-3xl border-r pr-4">
          <UpdateWorkspaceName id={id} name={workspace.name} />
        </div>
      </div>
    </ScrollArea>
  );
}
