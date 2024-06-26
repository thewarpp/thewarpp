"use client";

import { CircleUser, Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { MobSideNav } from "./mob-side-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { createClient } from "~/supabase/client";

const supabase = createClient();

export const Header = () => {
  // client router
  const router = useRouter();

  // state
  const [user, setUser] = useState<User | null>(null);
  console.log(user?.id);

  // handlers
  const signOut = useCallback(() => {
    supabase.auth
      .signOut()
      .then(router.refresh)
      .catch((err) => toast.error(err.message));
  }, [router]);

  // effects
  useEffect(() => {
    supabase.auth
      .getUser()
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(signOut);
  }, [signOut]);

  if (!user) {
    return null;
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <MobSideNav />
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="ml-auto rounded-full"
          >
            <CircleUser className="size-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div>
              My Account
              <p className="font-light">
                {user.user_metadata.first_name} {user.user_metadata.last_name}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
