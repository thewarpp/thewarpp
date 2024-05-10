import { google } from "googleapis";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { oauth2Client } from "~/server/constants";
import { db } from "~/server/db";

import YoutubeToggle from "./oauth-toggles/youtube";

interface snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
  localized: { title: string; description: string };
  country: string;
}

export default async function SocialConnections({ id }: { id: string }) {
  const youtube = await db
    .selectFrom("youtube")
    .where("workspace_id", "=", id)
    .selectAll()
    .executeTakeFirst();

  // const token = await oauth2Client.getAccessToken();
  oauth2Client.setCredentials({
    refresh_token: youtube?.refresh_token,
  });
  const service = google.youtube({ version: "v3", auth: oauth2Client });
  let channel: snippet | null = null;

  try {
    channel = await (service as any).channels
      .list({
        mine: true,
        part: "snippet",
        maxResults: 1,
      })
      .then((res: any) => res.data.items[0].snippet as snippet);
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
