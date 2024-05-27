import { CreateTodoDTO } from "../dtos/create-todo";
import { UpdateTodoDTO } from "../dtos/update-todo";
import { Todo } from "../model/todo";

export interface TodoRepository {
    create(createTodo: CreateTodoDTO): Promise<Todo>;
    get(todoId: number): Promise<Todo|null>;
    getAll(): Promise<Todo[]>;
    update(todoId: number, updateTodo: UpdateTodoDTO): Promise<Todo>;
    delete(todoId: number): Promise<void>;
}