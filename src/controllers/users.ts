import type { Request, Response } from "express";
import { addressSchema } from "../schema/address.js";
import { prisma } from "../db.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";
import { updateUserSchema } from "../schema/users.js";
import type { Address } from "@prisma/client";
import { BadRequestException } from "../exceptions/badRequest.js";

export const addAddress = async (req: Request, res: Response) => {
    const validatedAddress = addressSchema.parse(req.body);
    const userId = req.user.id;

    const address = await prisma.address.create({
        data: {
            lineOne: validatedAddress.lineOne,
            lineTwo: validatedAddress.lineTwo,
            pincode: validatedAddress.pincode,
            country: validatedAddress.country,
            city: validatedAddress.city,
            user: {
                connect: { id: userId }
            }
        }
    })

    res.json(address);
}

export const health = async (req: Request, res: Response) => {
    res.json("Healthy");
}

export const deleteAddress = async (req: Request, res: Response) => {
    const addressId = Number(req.params.id);
    const userId = req.user.id;

    const result = await prisma.address.deleteMany({
        where: {
            id: addressId,
            userId: userId
        }
    });

    if (result.count === 0) {
        throw new NotFoundException(
            "Address not found or not owned by the user",
            ErrorCode.ADDRESS_NOT_FOUND
        );
    }

    res.json({
        result,
        success: true
    });
};

export const listAddress = async (req: Request, res: Response) => {
    const addresses = await prisma.address.findMany({
        where: { userId: req.user.id }
    })
    res.json(addresses)
}

export const updateUser = async (req: Request, res: Response) => {
    const validatedData = updateUserSchema.parse(req.body);
    const userId = req.user.id;

    const data: any = {};

    if (validatedData.name !== undefined) {
        data.name = validatedData.name;
    }

    if (validatedData.defaultShippingAddressId !== undefined) {
        const address = await prisma.address.findFirst({
            where: {
                id: +validatedData.defaultShippingAddressId!,
                userId
            }
        });

        if (!address) {
            throw new NotFoundException(
                "Address not found or not owned by user",
                ErrorCode.ADDRESS_NOT_FOUND
            );
        }

        data.defaultShippingAddress = {
            connect: { id: address.id }
        };
    }

    if (Object.keys(data).length === 0) {
        throw new BadRequestException("Nothing to update", ErrorCode.BAD_REQUEST);
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data
    });

    res.json(updatedUser);
};