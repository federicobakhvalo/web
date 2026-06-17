import { useUser } from "@/app/providers/use-contexts";
import { UserModeToggle } from "@/feautures/user/ui/user-mode-toggle";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/config/route-config";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export function AppHeader() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-10 w-full flex items-center justify-between py-2 px-1.5 border-b sm:min-h-12 bg-background">
      <div className="flex grow justify-between items-center sm:grow-0">
        <Button variant={"outline"} size={"icon"}>
          <Menu className="size-5" />
        </Button>

        <div className="flex justify-center items-center grow mx-2 sm:mx-2.5 lg:mx-3 gap-1 cursor-pointer">
          <Link to={ROUTES.MAIN.HOME}>
            <h4 className=" text-clamp-sm font-medium text-card-foreground hover:opacity-90">
              Blog Application
            </h4>
          </Link>
        </div>
      </div>

      <UserModeToggle />

      {/* <UserModeToggle user={user} /> */}
    </header>
  );
}
