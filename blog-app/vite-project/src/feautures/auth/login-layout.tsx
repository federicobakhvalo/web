import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { LoginForm } from "./login-form";

export const LoginLayout = () => {
  return (
    <Card className="w-full max-w-md p-6 m-auto ">
      <CardHeader>
        <CardTitle>Authorization</CardTitle>
        <CardDescription>
          Please enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};
