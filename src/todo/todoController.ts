import { NextFunction, Request, Response, Router } from "express";
import { TodoService } from "./todoService";
import { CreateTodoDTO, createTodoDtoSchema } from "./dtos/create-todo";
import { UpdateTodoDTO, updateTodoDtoSchema } from "./dtos/update-todo";
import { authMiddleware } from "../middlewares/authMiddleware";
export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createTodo: CreateTodoDTO = createTodoDtoSchema.parse(
                req.body
            );

            const todo = await this.todoService.create(createTodo);
            res.status(201).json(todo);
        } catch (err) {
            next(err);
        }
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            const todoId = +req.params.id;
            const todo = await this.todoService.get(todoId);
            res.json(todo);
        } catch (err) {
            next(err);
        }
    }

    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const todos = await this.todoService.getAll();
            res.json(todos);
        } catch (err) {
            next(err);
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updateTodo = updateTodoDtoSchema.parse(
                req.body
            );

            const todoId = +req.params.id;
            const todo = await this.todoService.update(todoId, updateTodo);
            res.json(todo);
        } catch (err) {
            next(err);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const todoId = +req.params.id;
            const todo = await this.todoService.delete(todoId);
            res.json(todo);
        } catch (err) {
            next(err);
        }
    }

    generateRouter(): Router {
        const route = Router();

        route.use(authMiddleware);

        route.post("/", this.create.bind(this));
        route.get("/", this.getAll.bind(this));
        route.get("/:id", this.get.bind(this));
        route.put("/:id", this.update.bind(this));
        route.delete("/:id", this.delete.bind(this));

        return route;
    }
}
