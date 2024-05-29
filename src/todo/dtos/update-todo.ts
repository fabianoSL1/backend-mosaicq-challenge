import { TodoStatus } from "../entities/todoStatus";
import { z } from "zod";


export const updateTodoDtoSchema = z.object({
    title: z.string().max(255),
    describe: z.string().min(150).max(255),
    status: z.nativeEnum(TodoStatus)
});

export type UpdateTodoDTO = z.infer<typeof updateTodoDtoSchema>;
