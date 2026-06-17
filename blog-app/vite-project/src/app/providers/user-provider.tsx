import type { IUser } from "@/feautures/user/user";
import { useEffect, useMemo, useState } from "react";
import { UserProviderContext } from "./contexts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/route-config";

export type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  handlelogout: () => void;
};

type UserProviderProps = {
  children: React.ReactNode;
  userKey: string;
};

export const UserProvider = ({
  children,
  userKey = "user",
}: UserProviderProps) => {
  //

  const [user, setUser] = useState<IUser | null>(() => {
    return (localStorage.getItem(userKey) as IUser | null) ?? null;
  });

  const navigate = useNavigate();

  const handlelogout = () => {
    try {
      console.log("Logout...");
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    } finally {
      localStorage.removeItem(userKey);
      setUser(null);
    }

    navigate(ROUTES.MAIN.HOME);
  };

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(userKey);
    } else {
      localStorage.setItem(userKey, JSON.stringify(user));
    }
  }, [user, userKey]);

  const value: UserContextType = useMemo(
    () => ({ user, setUser, handlelogout }),
    [user],
  );

  return (
    <>
      <UserProviderContext.Provider value={value}>
        {children}
      </UserProviderContext.Provider>
    </>
  );
};
