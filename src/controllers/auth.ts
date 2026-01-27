import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db.js";
import { hashSync, compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken';
import { BadRequestException } from "../exceptions/badRequest.js";
import { ErrorCode } from "../exceptions/root.js";
import { UnprocessableEntity } from "../exceptions/validation.js";
import { signupSchema } from "../schema/users.js";
import { NotFoundException } from "../exceptions/not-found.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    signupSchema.parse(req.body)
    const { email, password, name } = req.body;

    let user = await prisma.user.findFirst({
        where: {
            email
        }
    })


    if (user) {
        return next(new BadRequestException("User already exists!", ErrorCode.USER_ALREADY_EXISTS))
    }

    user = await prisma.user.create({
        data: {
            name, email, password: hashSync(password, 10)
        }
    })
    res.json({
        message: "signup successful",
        user
    })

}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!user) {
        throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND)
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestException("Incorrect email or password", ErrorCode.INCORRECT_EMAIL_OR_PASSWORD)
    }

    const token = jwt.sign({
        userId: user.id
    }, process.env.JWT_SECRET!)

    res.json({
        message: "login successful",
        user,
        token
    })

}

export const me = async (req: Request, res: Response, next: NextFunction) => {
    res.json(req.user);
}