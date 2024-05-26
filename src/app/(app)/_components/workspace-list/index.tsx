import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";

import { DataTable } from "~/components/ui/data-table";
import { getDb } from "~/server/db";
import { account, workspace } from "~/server/db/schema";
import { createClient } from "~/supabase/server";

import { columns } from "./columns";

const WorkpsaceList = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    notFound();
  }

  const db = getDb();
  try {
    const list = await db
      .select({
        access_type: account.type,
        id: workspace.id,
        name: workspace.name,
        created_at: workspace.created_at,
      })
      .from(workspace)
      .innerJoin(account, eq(workspace.id, account.workspace_id))
      .where(or(eq(account.user_id, data.user.id), eq(account.type, "CREATOR")))
      .limit(10);

    return <DataTable columns={columns} data={list} />;
  } catch (error) {
    console.log(error);
    return <DataTable columns={columns} data={[]} />;
  }
};

export default WorkpsaceList;
