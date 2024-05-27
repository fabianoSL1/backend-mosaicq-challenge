import { CreateTodoDTO } from "./dtos/create-todo";
import { UpdateTodoDTO } from "./dtos/update-todo";
import { HttpException } from "../exceptions/httpException";
import { Todo } from "./entities/todo";

import { TodoRepositoryPostgres } from "./repositories/todoRepositoryPostgres";
import { TodoRepository } from "./todoRepository";

export class TodoService {
    private todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepositoryPostgres();
    }

    async create(createTodo: CreateTodoDTO): Promise<Todo> {
        return await this.todoRepository.create(createTodo);
    }

    async get(todoId: number): Promise<Todo> {
        const todo = await this.todoRepository.get(todoId);

        if (!todo) {
            throw new HttpException(404, "todo not found");
        }

        return todo;
    }

    async getAll(): Promise<Todo[]> {
        return await this.todoRepository.getAll();
    }

    async update(todoId: number, updateTodo: UpdateTodoDTO): Promise<Todo> {
        return await this.todoRepository.update(todoId, updateTodo);
    }

    async delete(todoId: number): Promise<Todo> {
        const todo = await this.get(todoId);

        await this.todoRepository.delete(todoId);

        return todo;
    }
}
