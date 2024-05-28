import { NextFunction, Request, Response, Router } from "express";
import { AuthService } from "./authService";

export class AuthController {
    private authSerivce: AuthService;

    constructor() {
        this.authSerivce = new AuthService();
    }

    create(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(this.authSerivce.generateToken());
        } catch (err) {
            next(err);
        }
    }

    generateRouter(): Router {
        const route = Router();

        route.post("/", this.create.bind(this));

        return route;
    }
}
