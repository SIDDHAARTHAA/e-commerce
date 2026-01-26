import z from "zod";

export const addressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().nullable(),
    pincode: z.string().length(6),
    country: z.string(),
    city: z.string(),
})