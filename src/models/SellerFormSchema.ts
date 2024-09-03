import { z } from "zod";

// export type SellerFormType = {
//   first_name: string;
//   last_name: string;
//   business_name: string;
//   business_url: string;
//   email: string;
//   phone: {
//     code: string;
//     number: string;
//   };
//   message: string;
// };

export const SellerFormSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .max(30, "Must be less than 30 characters long"),
  last_name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(30, "Must be less than 30 characters long"),
  business_name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(30, "Must be less than 30 characters long"),
  business_url: z
    .string()
    .min(1, { message: "This field is required" })
    .max(50, { message: "Must be less than 50 characters long" }),
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
  message: z
    .string()
    .min(1, { message: "This field is required" })
    .max(100, "Must be less than 100 characters long"),
});

export type SellerValidationSchema = z.infer<typeof SellerFormSchema>;
