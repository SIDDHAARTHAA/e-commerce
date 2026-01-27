import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { createProductSchema } from "../schema/products.js";

export const createProduct = async (req: Request, res: Response) => {
    const validatedData = createProductSchema.parse(req.body);

    const product = await prisma.product.create({
        data: {
            name: validatedData.name,
            description: validatedData.description,
            price: validatedData.price,
            tags: validatedData.tags.join(',')
        }
    })
    res.json(product)
}