import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  redirect(`/workspace/${id}/settings/general`);
}
