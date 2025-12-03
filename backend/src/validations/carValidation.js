import z from "zod";

export const createCarSchema = z.object({
  car_name: z.string().min(3).max(150),
  brand: z.string().min(2).max(100),
  year: z.coerce.number().int().min(1980).max(new Date().getFullYear()),
  mileage: z.coerce.number().nonnegative(),
  description: z.string().min(5),
  price: z.coerce.number().nonnegative(),
  address: z.string().min(3),
  status: z.enum(["available", "sold"]).default("available"),
});

export const updateCarSchema = z.object({
  car_name: z.string().min(3).max(150).optional(),
  brand: z.string().min(2).max(100).optional(),
  year: z.coerce
    .number()
    .int()
    .min(1980)
    .max(new Date().getFullYear())
    .optional(),
  mileage: z.coerce.number().nonnegative().optional(),
  description: z.string().min(5).optional(),
  price: z.coerce.number().nonnegative().optional(),
  address: z.string().min(3).optional(),
  status: z.enum(["available", "sold"]).optional(),
});
