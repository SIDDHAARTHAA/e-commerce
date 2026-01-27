import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { createProductSchema } from "../schema/products.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";

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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',');
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: +req.params.id!
            },
            data: product
        })
        res.json(updatedProduct)
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({ error: "id required" });
        return;
    }
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: +req.params.id
            },
        })

        res.json(deletedProduct);
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
    }
}
export const listProducts = async (req: Request, res: Response) => {
    let skip;
    if (!req.query.skip) {
        skip = 0
    } else {
        skip = req.query.skip
    }

    const count = await prisma.product.count();

    const products = await prisma.product.findMany({
        skip: +skip,
        take: 5
    })

    res.json({
        count, data: products
    })
}

export const getProductById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({ error: "id required" });
        return;
    }
    try {
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })
        res.json(product);
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
    }
}

