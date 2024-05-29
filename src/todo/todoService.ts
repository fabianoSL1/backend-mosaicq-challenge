import { CreateTodoDTO } from "./dtos/create-todo";
import { UpdateTodoDTO } from "./dtos/update-todo";
import { HttpException } from "../exceptions/httpException";
import { Todo } from "./entities/todo";

import { TodoRepositoryPostgres } from "./repositories/todoRepositoryPostgres";
import { TodoRepository } from "./todoRepository";
import { TodoStatus } from "./entities/todoStatus";

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
        const todoList = await this.todoRepository.getAll();

        if (!todoList) {
            throw new HttpException(500, "");
        }

        return todoList;
    }

    async update(todoId: number, updateTodo: UpdateTodoDTO): Promise<Todo> {
        const invalidStatus = !Object.values(TodoStatus).includes(
            updateTodo.status
        );

        if (invalidStatus) {
            throw new HttpException(422, "invalid todo status");
        }

        return await this.todoRepository.update(todoId, updateTodo);
    }

    async delete(todoId: number): Promise<Todo> {
        const todo = await this.get(todoId);

        await this.todoRepository.delete(todoId);

        return todo;
    }
}
