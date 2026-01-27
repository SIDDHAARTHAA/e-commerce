import type { Request, Response } from "express";
import { createCartSchema } from "../schema/cart.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";
import type { Product } from "@prisma/client";
import { prisma } from "../db.js";
import { BadRequestException } from "../exceptions/badRequest.js";

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
    if (!req.params.id) {
        throw new NotFoundException("ProductId missing", ErrorCode.BAD_REQUEST);
    }
    const cartItemId = +req.params.id;

    const cartItem = await prisma.cartItems.findFirst({
        where: {
            id: cartItemId,
            userId: req.user.id
        }
    });

    if (!cartItem) {
        throw new NotFoundException("Cart item not found", ErrorCode.PRODUCT_NOT_FOUND);
    }

    await prisma.cartItems.delete({
        where: {
            id: cartItemId
        }
    });

    res.json("Success");
}

export const changeQuantity = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new NotFoundException("ProductId missing", ErrorCode.BAD_REQUEST);
    }
    if (typeof req.body.quantity !== 'number' || req.body.quantity < 0) {
        throw new BadRequestException("Invalid quantity", ErrorCode.BAD_REQUEST);
    }
    const quantity = req.body.quantity;
    const cartItemId = +req.params.id;

    const cartItem = await prisma.cartItems.findFirst({
        where: {
            id: cartItemId,
            userId: req.user.id
        }
    });

    if (!cartItem) {
        throw new NotFoundException("Cart item not found", ErrorCode.PRODUCT_NOT_FOUND);
    }

    if (quantity == 0) {
        await prisma.cartItems.delete({
            where: {
                id: cartItemId
            }
        });
        res.json("Success");
    } else {
        const updated = await prisma.cartItems.update({
            where: { id: cartItemId },
            data: { quantity }
        });

        res.json(updated);
    }
}


export const getCart = async (req: Request, res: Response) => {
    const cartItems = await prisma.cartItems.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    });
    res.json(cartItems);
}
