import type { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root.js"
import { InternalException } from "./exceptions/internal-exception.js"
import { ZodError } from "zod"
import { BadRequestException } from "./exceptions/badRequest.js"

export const errorHandler = (method: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            }
            //un handled error, run time error
            else {
                if (error instanceof ZodError) {
                    exception = new BadRequestException("Unprocessable entity", ErrorCode.UNPROCESSABLE_ENTITY);
                } else
                    exception = new InternalException("Something went wrong", error, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }

    }
}