import z from "zod";

export const createCarSchema = z.object({
  car_name: z.string().min(3),
  brand: z.string().min(2),
  year: z.number(),
  mileage: z.number(),
  description: z.string().min(5),
  price: z.number(),
  address: z.string(),
  image_url: z.string().url().optional(), 
});

export const updateCarSchema = z.object({
  car_name: z.string().min(3).optional(),
  brand: z.string().min(2).optional(),
  year: z.number().optional(),
  mileage: z.number().optional(),
  description: z.string().min(5).optional(),
  price: z.number().optional(),
  address: z.string().optional(),
  image_url: z.string().url().optional(), 
  status: z.enum(["available", "sold"]).optional(),
});
