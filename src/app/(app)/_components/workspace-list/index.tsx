import { notFound } from "next/navigation";

import { DataTable } from "~/components/ui/data-table";
import { db } from "~/server/db";
import { createClient } from "~/supabase/server";

import { columns } from "./columns";

const WorkpsaceList = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    notFound();
  }

  const list = await db
    .selectFrom("workspace")
    .innerJoin("account as a", "a.workspace_id", "workspace.id")
    .where(($) =>
      $.and([
        $.eb("a.user_id", "=", data.user.id),
        $.eb("a.type", "=", "CREATOR"),
      ]),
    )
    .select([
      "a.type as access_type",
      "workspace.id",
      "workspace.name",
      "workspace.created_at",
    ])
    .limit(10)
    .execute();

  return <DataTable columns={columns} data={list} />;
};

export default WorkpsaceList;
