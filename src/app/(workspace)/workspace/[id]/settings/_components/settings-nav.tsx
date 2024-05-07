"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

export const SettingsNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className="grid gap-2 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link
        href={{ query: { section: "general" } }}
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
        href={{ query: { section: "connections" } }}
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
