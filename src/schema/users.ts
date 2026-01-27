import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const updateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddressId: z.number().nullable().optional(),
});