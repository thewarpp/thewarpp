import type { ReactNode } from "react";

import { SettingsNav } from "./_components/settings-nav";

export default async function SettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 lg:gap-6 lg:p-6">
      <div className="mx-auto grid w-full gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <SettingsNav />
        {children}
      </div>
    </div>
  );
}
