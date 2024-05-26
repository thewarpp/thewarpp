import type { ReactNode } from "react";
import { SideBar } from "./_components/layout/sidebar";
import { Header } from "./_components/layout/header";

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
