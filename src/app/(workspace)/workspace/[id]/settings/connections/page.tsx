import { ScrollArea } from "~/components/ui/scroll-area";

import SocialConnections from "./_components/social-connections";

export const runtime = "edge";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <ScrollArea>
      <div className="grid h-full min-h-[calc(100vh_-_theme(spacing.48))] gap-6">
        <div className="h-full max-w-3xl border-r pr-4">
          <SocialConnections id={id} />
        </div>
      </div>
    </ScrollArea>
  );
}
