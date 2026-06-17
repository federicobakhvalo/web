import type { PropsWithChildren, FC } from "react";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "./user-provider";
// import { ThemeProvider } from "./theme-provider";
// import { AuthProvider } from "./auth-provider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider> */}
      <ThemeProvider>
        <UserProvider userKey="user">{children}</UserProvider>
      </ThemeProvider>
    </>
  );
};
export default Providers;
