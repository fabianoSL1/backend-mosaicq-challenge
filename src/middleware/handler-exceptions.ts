import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException";

export function handlerExceptions(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    next();
  } catch (err) {
    console.error(err);
    
    let code = 500;
    let message = "internal server error";

    if (err instanceof HttpException) {
      code = err.getCode();
      message = err.getMessage();
    }

    return res.status(code).json({ message });
  }
}
