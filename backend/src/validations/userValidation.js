import z from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter"),
  username: z.string().min(3, "username minimal 3 karakter"),
  email: z.string().email("email tidak valid"),
  password: z.string().min(8, "password minimal 8 karakter"),
  role: z.enum(["admin", "user", "seller"], { message: "Role tidak valid" }),
});

export const updateUserSchema = z.object({
  fullname: z.string().min(3).optional(),
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),

  // password optional
  password: z.string().min(8).optional(),

  role: z.enum(["admin", "user", "seller"]).optional(),

  address: z.string().optional(),
  phone_number: z.string().optional(),
  age: z.string().optional(),
});
