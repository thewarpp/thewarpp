import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const NoSocialConnection = ({ id }: { id: string }) => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Socials</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no social media connections
          </h3>
          <p className="text-sm text-muted-foreground">
            You can connect your social in the settings.
          </p>
          <Link
            href={{
              pathname: `/workspace/${id}/settings/connections`,
            }}
            className={cn(buttonVariants(), "mt-4")}
          >
            Add Social Connection
          </Link>
        </div>
      </div>
    </>
  );
};
