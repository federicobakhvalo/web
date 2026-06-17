import z from "zod";

export const loginSchema = z.object({
  name: z
    .string({ error: "Login cannot be empty" })
    .min(1, "Login cannot be empty")
    .transform((val) => val.trim()),
  password: z
    .string({ error: "Password cannot be empty" })
    .min(5, "Password must be at least 5 characters long"),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
