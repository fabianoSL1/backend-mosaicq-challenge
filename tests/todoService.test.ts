import { HttpException } from "../src/exceptions/httpException";
import { TodoStatus } from "../src/todo/entities/todoStatus";
import { TodoRepositoryPostgres } from "../src/todo/repositories/todoRepositoryPostgres";
import { TodoService } from "../src/todo/todoService";

jest.mock("../src/todo/repositories/todoRepositoryPostgres");

describe("TodoService tests", () => {
    test("when fetch all fail throw HttpException", async () => {
        const todoService = new TodoService();

        expect.assertions(2);

        try {
            await todoService.getAll();
        } catch (err) {
            expect(err).toBeInstanceOf(HttpException);

            if (err instanceof HttpException) {
                expect(err.getCode()).toEqual(500);
            }
        }
    });

    test("when fetch all ok", async () => {
        const todoService = new TodoService();

        jest.spyOn(
            TodoRepositoryPostgres.prototype,
            "getAll"
        ).mockResolvedValue([]);

        const data = await todoService.getAll();
        expect(data).toBeDefined();
    });

    test("when fetch not exist todo throw exception", async () => {
        const todoService = new TodoService();

        expect.assertions(2);

        try {
            await todoService.get(1);
        } catch (err) {
            expect(err).toBeInstanceOf(HttpException);

            if (err instanceof HttpException) {
                expect(err.getCode()).toEqual(404);
            }
        }
    });

    test("when send invalid todo status throw exception", async () => {
        const todoService = new TodoService();

        expect.assertions(2);

        try {
            await todoService.update(1, {
                describe: "test",
                title: "test",
                status: "test" as TodoStatus,
            });
        } catch (err) {
            expect(err).toBeInstanceOf(HttpException);

            if (err instanceof HttpException) {
                expect(err.getCode()).toEqual(422);
            }
        }
    });
});
