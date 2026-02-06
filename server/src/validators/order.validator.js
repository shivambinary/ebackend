import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        items: z.array(
            z.object({
                product: z.string(),
                quantity: z.number().int().positive(),
                price: z.number().positive(),
            })
        ).min(1),
    }),
});