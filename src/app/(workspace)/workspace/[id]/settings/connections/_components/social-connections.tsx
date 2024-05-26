import { eq } from "drizzle-orm";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Snippet } from "~/lib/youtube";
import { Youtube } from "~/lib/youtube";
import { getDb } from "~/server/db";
import { youtube as youtubeSchema } from "~/server/db/schema";

import YoutubeToggle from "./oauth-toggles/youtube";

export default async function SocialConnections({ id }: { id: string }) {
  const db = getDb();
  const youtube = await db
    .select()
    .from(youtubeSchema)
    .where(eq(youtubeSchema.workspace_id, id))
    .limit(1)
    .get();

  if (!youtube) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <YoutubeToggle id={id} />
          </div>
        </CardContent>
      </Card>
    );
  }

  let channel: Snippet | null = null;
  try {
    const tokens = await Youtube.refreshAccessToken(youtube.refresh_token);
    channel = await Youtube.getYouTubeChannelSnippet(tokens.access_token);
  } catch (error) {
    console.log(error);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          <YoutubeToggle
            youtube={youtube}
            youtubeId={channel?.customUrl}
            id={id}
          />
        </div>
      </CardContent>
    </Card>
  );
}
