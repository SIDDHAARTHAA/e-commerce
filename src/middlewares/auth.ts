import type { NextFunction, Request, Response } from "express"
import { UnathorizedException } from "../exceptions/unauthorized.js"
import { ErrorCode } from "../exceptions/root.js"
import jwt from "jsonwebtoken"
import { prisma } from "../db.js"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return next(new UnathorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any

        const user = await prisma.user.findFirst({
            where: { id: payload.userId },
        })

        if (!user) {
            return next(new UnathorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
        }

        req.user = user
        next()
    } catch {
        next(new UnathorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }
}

export default authMiddleware