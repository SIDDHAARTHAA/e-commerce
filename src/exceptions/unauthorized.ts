import { HttpException } from "./root.js";

export class UnathorizedException extends HttpException {
    constructor(message: string, errorCode: number, errors?: any) {
        super(message, errorCode, 401, errors)
    }
}