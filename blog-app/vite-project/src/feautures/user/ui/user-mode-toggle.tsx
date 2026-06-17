import { memo } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useTheme, useUser } from "@/app/providers/use-contexts";

import { Link } from "react-router-dom";

import { UserAvatar } from "@/shared/components/user/user-avatar";
import { Lock, Moon, Sun } from "lucide-react";
import { ROUTES } from "@/shared/config/route-config";

export const UserModeToggle = memo(function UserModeToggle() {
  const { user, handlelogout } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="p-0">
          <UserAvatar user={user} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52 max-w-dvw">
          {user ? (
            <DropdownMenuItem
              className="py-2.5 cursor-pointer"
              onClick={handlelogout}
            >
              Logout
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="py-2.5 cursor-pointer">
              <Link
                to={ROUTES.MAIN.LOGIN}
                className="flex items-center gap-2 cursor-pointer justify-between w-full"
              >
                <p>Login</p>
                <Lock className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="py-2.5 cursor-pointer justify-between"
            onClick={toggleTheme}
          >
            <p>Change Theme</p>
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
});
