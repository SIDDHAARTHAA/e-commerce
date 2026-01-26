import type { Request, Response } from "express";
import { addressSchema } from "../schema/address.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";
import type { User } from "@prisma/client";
import { prisma } from "../db.js";

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

}

export const listAddress = async (req: Request, res: Response) => {

}


