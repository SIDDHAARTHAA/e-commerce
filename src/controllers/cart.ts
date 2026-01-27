import type { Request, Response } from "express";
import { createCartSchema } from "../schema/cart.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";
import type { Product } from "@prisma/client";
import { prisma } from "../db.js";

export const addItemToCart = async (req: Request, res: Response) => {
    const validatedData = createCartSchema.parse(req.body);

    //verify that product exists
    const product = await prisma.product.findUnique({
        where: { id: validatedData.productId }
    });

    if (!product) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
    }

    //upsert to both create and update
    const cart = await prisma.cartItems.upsert({
        where: {
            userId_productId: {
                userId: req.user.id,
                productId: validatedData.productId
            }
        },
        update: {
            quantity: { increment: validatedData.quantity }
        },
        create: {
            userId: req.user.id,
            productId: validatedData.productId,
            quantity: validatedData.quantity
        }
    });

    res.json(cart);
}
export const deleteItemFromCart = async (req: Request, res: Response) => {

}

export const changeQuantity = async (req: Request, res: Response) => { }
export const getCart = async (req: Request, res: Response) => { }
