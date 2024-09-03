import { z } from "zod";
import { getTranslatedText } from "../utils/stringUtils";

export const ApplyFormSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: getTranslatedText("FIELD_REQUIRED"),
    })
    .max(30, "Must be less than 30 characters long"),
  last_name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(30, "Must be less than 30 characters long"),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email address" }),
  phone: z.object({
    code: z.string().default("+91"),
    number: z
      .string()
      .min(1, { message: "This field is required" })
      .max(10, { message: "Phone number must be 10 digits" }),
  }),
  message: z.string().optional(),
  file_path: z.string().min(1, { message: "This field is required" }),
  role: z.string().optional()
});

export type ApplyFormValidation = z.infer<typeof ApplyFormSchema>;
