import { z } from "zod";

export const LoginFormSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (val) => /^\d{10}$/.test(val) || val.endsWith(".com"),
      { message: "Must be a valid phone number or email" }
    ),
  otp: z.string().optional(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
