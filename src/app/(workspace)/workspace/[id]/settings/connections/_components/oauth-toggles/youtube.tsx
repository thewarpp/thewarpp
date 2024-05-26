"use client";

import { Check, Loader, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";

interface Youtube {
  id: string;
  created_at: Date;
  updated_at: Date;
  workspace_id: string;
  refresh_token: string;
  access_token: string;
}

const YoutubeToggle = ({
  youtube,
  id,
  youtubeId,
}: {
  youtube?: Youtube;
  id: string;
  youtubeId?: string;
}) => {
  // router
  const router = useRouter();

  // mutation
  const { mutate: authorize, isPending } =
    api.youtube.generateAuthUrl.useMutation({
      onSuccess: (res) => {
        router.replace(res);
      },
    });

  const { mutate: disconnect, isPending: disconnecting } =
    api.youtube.disconnect.useMutation({
      onSuccess: router.refresh,
    });

  // handlers
  const onToggle = useCallback(() => {
    if (!youtube) authorize({ id });
    else disconnect({ id });
  }, [authorize, disconnect, id, youtube]);

  return (
    <div className="space-y-2">
      <Label>Youtube</Label>
      <div className="flex flex-row items-center gap-x-3">
        <YoutubeIcon />
        <Switch
          disabled={isPending || disconnecting}
          onCheckedChange={onToggle}
          checked={!!youtube}
        />

        {isPending || disconnecting ? (
          <Loader className="size-4 animate-spin" />
        ) : null}

        {youtubeId ? (
          <Link
            href={`https://youtube.com/${youtubeId}`}
            className="flex flex-row items-center gap-x-1"
          >
            <p className="text-sm text-green-700/70">{youtubeId}</p>
            <Check strokeWidth={3} className="size-3 text-green-700/70" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default YoutubeToggle;
