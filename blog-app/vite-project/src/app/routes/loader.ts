import { ROUTES } from "@/shared/config/route-config";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";

export async function ProtectedLoader({ request, params }: LoaderFunctionArgs) {
  const user = localStorage.getItem("user");

  if (!user) {
    return redirect(ROUTES.MAIN.LOGIN);
  }

  return null;
}

export async function AuthLoader({ request, params }: LoaderFunctionArgs) {
  const user = localStorage.getItem("user");

  if (user) {
    return redirect(ROUTES.MAIN.HOME);
  }

  return null;
}
