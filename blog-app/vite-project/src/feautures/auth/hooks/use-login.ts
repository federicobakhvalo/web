import { useForm } from "react-hook-form";
import type { ILoginSchema } from "../login-schema";
import { loginSchema } from "../login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { mockUsers } from "@/mocks/data";
import { useUser } from "@/app/providers/use-contexts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/route-config";

export const useLogin = () => {
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  const navigate = useNavigate();

  const onSubmit = form.handleSubmit((data: ILoginSchema) => {
    try {
      // сделай авторизацию из @mocks/data.ts
      const user = mockUsers.find((u) => u.name === data.name);
      if (!user || user.password !== data.password) {
        throw new Error("Invalid email or password");
      }
      setError(null);
      const clear_user = {
        id: user.id,
        name: user.name,
      };

      setUser(clear_user);
      navigate(ROUTES.MAIN.HOME);

      // Здесь должна быть логика авторизации, например, вызов API
    } catch (error) {
      console.error("Error occurred while submitting login form:", error);
      setError("An error occurred while submitting the login form.");
    }

    // Handle login logic here
  });

  return {
    form,
    error,
    onSubmit,
  };
};
