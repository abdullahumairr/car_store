import z from "zod";

export const createCarSchema = z.object({
  user_id: z.number({
    required_error: "user_id wajib diisi",
    invalid_type_error: "user_id harus berupa angka",
  }),

  car_name: z
    .string()
    .min(3, "nama mobil minimal 3 karakter")
    .max(150, "nama mobil maksimal 150 karakter"),

  brand: z
    .string()
    .min(2, "brand minimal 2 karakter")
    .max(100, "brand maksimal 100 karakter"),

  year: z
    .number({
      required_error: "tahun mobil wajib diisi",
      invalid_type_error: "tahun harus berupa angka",
    })
    .int("tahun harus bilangan bulat")
    .min(1980, "tahun tidak boleh kurang dari 1980")
    .max(
      new Date().getFullYear(),
      "tahun tidak boleh lebih dari tahun sekarang"
    ),

  mileage: z
    .number({
      invalid_type_error: "kilometer harus berupa angka",
    })
    .nonnegative("kilometer tidak boleh negatif"),

  description: z.string().min(5, "deskripsi minimal 5 karakter"),

  price: z
    .number({
      required_error: "harga wajib diisi",
      invalid_type_error: "harga harus berupa angka",
    })
    .nonnegative("harga tidak boleh negatif"),

  address: z.string().min(3),
  image_url: z.string().nullable(),

  status: z.enum(["available", "sold"]).default("available"),
});

export const updateCarSchema = z.object({
  user_id: z
    .number({
      invalid_type_error: "user_id harus berupa angka",
    })
    .optional(),

  car_name: z
    .string()
    .min(3, "nama mobil minimal 3 karakter")
    .max(150, "nama mobil maksimal 150 karakter")
    .optional(),

  brand: z
    .string()
    .min(2, "brand minimal 2 karakter")
    .max(100, "brand maksimal 100 karakter")
    .optional(),

  year: z
    .number({
      invalid_type_error: "tahun harus berupa angka",
    })
    .int("tahun harus bilangan bulat")
    .min(1980, "tahun tidak boleh kurang dari 1980")
    .max(
      new Date().getFullYear(),
      "tahun tidak boleh lebih dari tahun sekarang"
    )
    .optional(),

  mileage: z
    .number({
      invalid_type_error: "kilometer harus berupa angka",
    })
    .nonnegative("kilometer tidak boleh negatif")
    .optional(),

  description: z.string().min(5, "deskripsi minimal 5 karakter").optional(),

  price: z
    .number({
      invalid_type_error: "harga harus berupa angka",
    })
    .nonnegative("harga tidak boleh negatif")
    .optional(),

  address: z.string().min(3).optional(),
  image_url: z.string().optional(),

  status: z.enum(["available", "sold"]).optional(),
});
