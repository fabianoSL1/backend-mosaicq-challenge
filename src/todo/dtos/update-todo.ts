import { TodoStatus } from "../entities/todoStatus";

export type UpdateTodoDTO = {
    title: string;
    describe: string;
    status: TodoStatus;
};
