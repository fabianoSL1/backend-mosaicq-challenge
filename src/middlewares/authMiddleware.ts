import { NextFunction, Request, Response } from "express";
import { AuthService } from "../auth/authService";
import { HttpException } from "../exceptions/httpException";

export function  authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authService = new AuthService();

    const { authorization } = req.headers;

    if (!authorization) {
        throw new HttpException(403, "authorization is required");
    }

    const [_, token] = authorization.split(" ");

    authService.validate(token);
    next();
}
