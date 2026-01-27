import type { NextFunction, Request, Response } from "express"
import { UnathorizedException } from "../exceptions/unauthorized.js"
import { ErrorCode } from "../exceptions/root.js"

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user.role == "ADMIN") {
        next();
    } else {
        next(new UnathorizedException("Unathorized", ErrorCode.UNAUTHORIZED));
    }
}

export default adminMiddleware