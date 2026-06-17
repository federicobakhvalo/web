import { useContext } from "react";
import { ThemeProviderContext, UserProviderContext } from "./contexts";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useUser = () => {
  const context = useContext(UserProviderContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
