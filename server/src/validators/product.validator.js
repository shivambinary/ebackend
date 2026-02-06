import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().positive(),
    totalStock: z.coerce.number().int().min(0),
    category: z.string().min(1),
    images: z.array(z.string()).optional(),
  }),
});


export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    totalStock: z.number().int().min(0).optional(),
    category: z.string().min(1).optional(),
    images: z.array(z.string()).optional(),
  }),
});
