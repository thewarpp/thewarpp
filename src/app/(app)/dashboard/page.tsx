import { Loader } from "lucide-react";
import nextDynamic from "next/dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { CreateWorkspace } from "../_components/create-workspace";

const WorkspaceList = nextDynamic(
  () => import("../_components/workspace-list"),
  {
    loading: () => (
      <div className="p-4">
        <Loader className="size-5 animate-spin" />
      </div>
    ),
  },
);

export default function Page() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-start">
            <div className="grid gap-2">
              <CardTitle>Workspaces</CardTitle>
            </div>
            <CreateWorkspace />
          </CardHeader>
          <CardContent>
            <WorkspaceList />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
