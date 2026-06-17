import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { routes } from "./routes";
import React from "react";

export const router = createBrowserRouter([
  {
    Component: App,

    children: routes,
  },
]);
