import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { ScrollArea } from "~/components/ui/scroll-area";
import { getDb } from "~/server/db";
import { workspace as workspaceSchema } from "~/server/db/schema";

import UpdateWorkspaceName from "./_components/update-workspace-name";

export const runtime = "edge";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const db = getDb();
  const workspace = await db
    .select({ name: workspaceSchema.name })
    .from(workspaceSchema)
    .where(eq(workspaceSchema.id, id))
    .limit(1)
    .get();

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
