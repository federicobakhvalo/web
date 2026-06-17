import "react-router-dom";

const MAIN_ROUTES = {
  HOME: "/",
  ARTICLE: "/articles/:id",
  CREATE: "/create",
  LOGIN: "/login",
};

export const ROUTES = { MAIN: MAIN_ROUTES } as const;

export type PathParams = {
  [ROUTES.MAIN.ARTICLE]: { id: string };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
