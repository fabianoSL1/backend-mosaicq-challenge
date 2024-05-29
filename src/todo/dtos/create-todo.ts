import { z } from "zod";

export const createTodoDtoSchema = z.object({
    title: z.string().min(1).max(255),
    describe: z.string().min(1).max(255)
});

export type CreateTodoDTO = z.infer<typeof createTodoDtoSchema>;