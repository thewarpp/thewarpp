"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import type { account_type } from "~/server/db/enums";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Workspace {
  id: string;
  name: string;
  created_at: Date;
  access_type: account_type;
}

export const columns: ColumnDef<Workspace>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => row.created_at.toDateString(),
    header: "created at",
  },
  {
    accessorKey: "access_type",
    cell: ({ row }) => {
      const access_type: Workspace["access_type"] = row.getValue("access_type");
      return <Badge>{access_type === "CREATOR" ? "Owner" : "Editor"}</Badge>;
    },
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          className={buttonVariants({ size: "icon", variant: "ghost" })}
          href={`/workspace/${row.original.id}`}
          prefetch={false}
        >
          <ExternalLink className="size-5" />
        </Link>
      );
    },
  },
];
