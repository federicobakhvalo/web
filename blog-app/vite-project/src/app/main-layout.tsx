import { AppHeader } from "@/feautures/layouts/header/app-header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <AppHeader />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </>
  );
}
