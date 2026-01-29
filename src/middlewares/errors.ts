import type { NextFunction, Request, Response } from "express";
import type { HttpException } from "../exceptions/root.js";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    console.error('Error caught in middleware:', JSON.stringify(error, null, 2), error);
    res.status(error.statusCode).json({
        message: error.message,
        errorcode: error.errorCode,
        errors: error.errors
    })
}