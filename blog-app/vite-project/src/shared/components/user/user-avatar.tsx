import type { IUser } from "@/feautures/user/user";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";

interface IUserAvatarProps extends React.HTMLAttributes<HTMLButtonElement> {
  user: IUser | null;
  className?: string;
}

export const UserAvatar = ({ user, className, ...props }: IUserAvatarProps) => {
  const initials: string | null = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : null;

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={cn(
        "size-9 rounded-full cursor-pointer overflow-hidden flex justify-center items-center gap-0  focus-visible:ring-0 focus-visible:ring-offset-0",
        className,
      )}
      {...props}
    >
      <Avatar key={user?.id || "guest"} className="w-full h-full">
        <AvatarFallback className="bg-transparent">
          {initials ? initials : <User2Icon />}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
};
