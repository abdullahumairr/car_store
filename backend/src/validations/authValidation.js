import { email, z } from "zod";

export const registerSchema = z
  .object({
    fullname: z.string().min(3),

    username: z
      .string()
      .min(3)
      .refine((s) => !s.includes(" "), "username tidak boleh mengandung spasi"),

    email: z.string().email(),

    password: z.string().min(6),

    confirmPassword: z.string().min(6),

    address: z.string().min(5).optional(),

    phone_number: z
      .string()
      .regex(/^0\d{9,14}$/, "nomor HP tidak valid")
      .optional(),

    age: z
      .coerce.number({ invalid_type_error: "umur harus angka" }) // ⬅ FIX UTAMA
      .min(10, "umur minimal 10 tahun")
      .max(100, "umur maksimal 100 tahun")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password dan confirm password harus sama",
    path: ["confirmPassword"],
  });



export const loginSchema = z.object({
  email: z.email("email tidak valid"),
  password: z.string().min(6, "password minimal 6 karakter"),
});
