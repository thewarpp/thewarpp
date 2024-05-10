"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

export const SettingsNav = () => {
  const pathname = usePathname();

  const uuid = useMemo(() => pathname.split("/")[2], [pathname]);

  return (
    <nav
      className="grid gap-2 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link
        href={`/workspace/${uuid}/settings/general`}
        className={cn(
          "py-1",
          pathname.includes("/settings/general")
            ? "font-semibold text-primary"
            : undefined,
        )}
      >
        General
      </Link>
      <Link
        href={`/workspace/${uuid}/settings/connections`}
        className={cn(
          "py-1",
          pathname.includes("/settings/connections")
            ? "font-semibold text-primary"
            : undefined,
        )}
      >
        Connections
      </Link>
      <Link
        className={cn(
          "py-1",
          pathname.includes("/settings/advanced")
            ? "font-semibold text-primary"
            : undefined,
        )}
        href="#"
      >
        Advanced
      </Link>
    </nav>
  );
};
