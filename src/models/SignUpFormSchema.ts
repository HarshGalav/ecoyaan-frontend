import { z } from "zod";

export const SignUpFormSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(30, { message: "Must be less than 30 characters long" }),
  identifier: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (val) => /^\d{10}$/.test(val) || val.endsWith(".com"),
      { message: "Must be a valid phone number or email" }
    ),
  otp: z.string().optional(),
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
