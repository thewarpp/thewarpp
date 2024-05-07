import type { ReactNode } from "react";

import { Header } from "~/components/workspace/header";
import { SideBar } from "~/components/workspace/sidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}
