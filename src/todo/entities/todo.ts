import { TodoStatus } from "./todoStatus";

export type Todo = {
    id: number;
    title: string;
    describe: string;
    status: TodoStatus;
    createAt: Date;
};
