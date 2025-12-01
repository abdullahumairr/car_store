import z from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter"),
  username: z.string().min(3, "fullname minimal 3 karakter"),
  email: z.email("email tidak valid"),
  password: z.string().min(8, "password minimal 8 karakter"),
  role: z.enum(["admin", "user"], "role harus 'admin' atau 'user'"),
});

export const updateUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter").optional(),
  username: z.string().min(3, "username minimal 3 karakter").optional(),
  email: z.string().email("email tidak valid").optional(),
  password: z
    .union([z.string().min(8, "Password minimal 8 karakter"), z.literal("")])
    .optional(),
  role: z
    .enum(["admin", "user"], { message: "role harus 'admin' atau 'user'" })
    .optional(),
  address: z.string({ invalid_type_error: "address tidak valid" }).optional(),
  phone_number: z
    .union([z.string(), z.number()])
    .transform((val) => val.toString())
    .optional(),

  age: z
    .union([z.string(), z.number()])
    .transform((val) => val.toString())
    .optional(),
});
