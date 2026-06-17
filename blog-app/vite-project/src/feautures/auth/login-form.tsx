import { FormProvider } from "react-hook-form";
import { useLogin } from "./hooks/use-login";
import { InputField } from "@/shared/components/form/input-field";
import { Button } from "@/shared/components/ui/button";

export const LoginForm = () => {
  const { form, error, onSubmit } = useLogin();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-2 w-full items-center max-w-sm mt-2"
      >
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Name"
        />
        <InputField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full my-2">
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
