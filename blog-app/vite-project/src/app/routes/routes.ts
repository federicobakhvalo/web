import { ROUTES } from "@/shared/config/route-config";
import type { RouteObject } from "react-router-dom";
import { AuthLoader, ProtectedLoader } from "./loader";

export const routes: RouteObject[] = [
  {
    path: ROUTES.MAIN.HOME,
    lazy: () => import("@/pages/home"),
    loader: ProtectedLoader,
  },
  {
    path: ROUTES.MAIN.CREATE,
    lazy: () => import("@/pages/create"),
    loader: ProtectedLoader,
  },
  {
    path: ROUTES.MAIN.ARTICLE,
    lazy: () => import("@/pages/article"),
    loader: ProtectedLoader,
  },
  {
    path: ROUTES.MAIN.LOGIN,
    lazy: () => import("@/pages/login"),
    loader: AuthLoader,
  },
];
