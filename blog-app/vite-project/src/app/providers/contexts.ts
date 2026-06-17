import { createContext } from "react";
import type { ThemeContextType } from "./theme-provider";
import type { UserContextType } from "./user-provider";

export const ThemeProviderContext = createContext<ThemeContextType | null>(
  null,
);

export const UserProviderContext = createContext<UserContextType | undefined>(
  undefined,
);
