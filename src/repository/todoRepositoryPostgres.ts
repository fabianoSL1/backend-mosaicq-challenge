import { CreateTodoDTO } from "../dtos/create-todo";
import { UpdateTodoDTO } from "../dtos/update-todo";
import { TodoRepository } from "./todoRepository";
import { Todo } from "../model/todo";
import { Pool } from "pg";
import { connection } from "../database/config";

export class TodoRepositoryPostgres implements TodoRepository {
    private pool: Pool;

    constructor() {
        this.pool = new Pool(connection);
    }

    async create(createTodo: CreateTodoDTO): Promise<Todo> {
        const result = await this.pool.query(
            "INSERT INTO todo(title, describe) VALUES($1, $2) RETURNING *",
            [createTodo.title, createTodo.describe]
        );

        const [todo] = result.rows;
        return todo;
    }

    async get(todoId: number): Promise<Todo | null> {
        const stmt = "SELECT * FROM todo WHERE id = $1";

        const result = await this.pool.query(stmt, [todoId]);
        const [todo] = result.rows;

        return todo;
    }

    async getAll(): Promise<Todo[]> {
        const stmt = "SELECT * FROM todo";

        const result = await this.pool.query(stmt);
        return result.rows;
    }

    async update(todoId: number, updateTodo: UpdateTodoDTO): Promise<Todo> {
        const stmt =
            "UPDATE todo SET title = $2, describe = $3, done = $4 WHERE id = $1 RETURNING *";
        const result = await this.pool.query(stmt, [
            todoId,
            updateTodo.title,
            updateTodo.describe,
            updateTodo.done,
        ]);
        const [todo] = result.rows;

        return todo;
    }

    async delete(todoId: number): Promise<void> {
        const stmt = "DELETE FROM todo WHERE id = $1";
        await this.pool.query(stmt, [todoId]);
    }
}
