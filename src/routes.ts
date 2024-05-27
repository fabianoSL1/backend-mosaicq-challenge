import { Router } from "express";
import { TodoController } from "./controller/todoController";

const routes = Router();

const todoController = new TodoController();

routes.use("/todos", todoController.generateRouter());

export { routes };
