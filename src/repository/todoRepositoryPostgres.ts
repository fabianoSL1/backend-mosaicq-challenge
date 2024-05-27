import { CreateTodoDTO } from "../dtos/create-todo";
import { UpdateTodoDTO } from "../dtos/update-todo";
import { HttpException } from "../exceptions/httpException";
import { Todo } from "../model/todo";
import { TodoRepository } from "./todoRepository";

export class TodoRepositoryPostgres implements TodoRepository {
    create(createTodo: CreateTodoDTO): Promise<Todo> {
        throw new Error("Method not implemented.");
    }
    get(todoId: number): Promise<Todo | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Todo[]> {
        throw new Error("Method not implemented.");
    }
    update(todoId: number, updateTodo: UpdateTodoDTO): Promise<Todo> {
        throw new Error("Method not implemented.");
    }
    delete(todoId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}