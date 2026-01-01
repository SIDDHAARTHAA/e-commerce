import type { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root.js"
import { InternalException } from "./exceptions/internal-exception.js"

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception: HttpException;
            //handled error
            if (error instanceof HttpException) {
                exception = error;
            }
            //un handled error, run time error
            else {
                exception = new InternalException("Something went wrong", error, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }

    }
}