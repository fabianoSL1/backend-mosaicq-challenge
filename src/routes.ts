import { Router } from "express";
import { TodoController } from "./todo/todoController";
import { AuthController } from "./auth/authController";

const routes = Router();

const todoController = new TodoController();
const authController = new AuthController();

routes.use("/todos", todoController.generateRouter());
routes.use("/auth", authController.generateRouter());

export { routes };
