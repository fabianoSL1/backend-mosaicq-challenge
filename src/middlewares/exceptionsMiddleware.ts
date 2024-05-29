import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException";
import { ZodError } from "zod";

export function exceptionsMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err.stack);

    let code = 500;
    let message = "internal server error";

    if (err instanceof ZodError) {
        const errors = err.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));

        return res.status(422).json({ errors });
    }

    if (err instanceof HttpException) {
        code = err.getCode();
        message = err.getMessage();
    }

    return res.status(code).json({ message });
}
