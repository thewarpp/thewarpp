import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "~/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const MobSideNav = () => {
  const pathname = usePathname();

  // useMemo
  const uuid = useMemo(() => pathname.split("/")[2]!, [pathname]);
  console.log(pathname);
  console.log(uuid);

  return (
    <>
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">TheWarpp</span>
        </Link>

        <Link
          href={`/workspace/${uuid}`}
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            !pathname.includes("analytics") &&
            !pathname.includes("drafts") &&
            !pathname.includes("scheduled") &&
            !pathname.includes("members") &&
            "bg-muted text-primary",
          )}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>

        <Link
          href={`/workspace/${uuid}/scheduled`}
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            pathname.includes("scheduled") && "bg-muted text-primary",
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          Scheduled
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </Link>

        <Link
          href={`/workspace/${uuid}/drafts`}
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            pathname.includes("drafts") && "bg-muted text-primary",
          )}
        >
          <Package className="h-4 w-4" />
          Drafts
        </Link>

        <Link
          href={`/workspace/${uuid}/members`}
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            pathname.includes("members") && "bg-muted text-primary",
          )}
        >
          <Users className="h-4 w-4" />
          Members
        </Link>

        <Link
          href={`/workspace/${uuid}/analytics`}
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            pathname.includes("analytics") && "bg-muted text-primary",
          )}
        >
          <LineChart className="h-4 w-4" />
          Analytics
        </Link>
      </nav>

      <div className="mt-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
