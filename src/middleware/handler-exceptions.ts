import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException";

export function handlerExceptions(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(err.stack);

    let code = 500;
    let message = "internal server error";

    if (err instanceof HttpException) {
        code = err.getCode();
        message = err.getMessage();
    }

    return res.status(code).json({ message });
}
