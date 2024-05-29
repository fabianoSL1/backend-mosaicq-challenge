import request from "supertest";
import { app } from "../src/app";

let auth: string;

beforeAll(async () => {
    const response = await request(app).post("/auth").send();
    auth = "Bearer " + response.body.token;
});

describe("GET /todos", () => {
    test("require authentication", async () => {
        const response = await request(app).get("/todos").send();
        expect(response.status).toEqual(403);
    });

    test("fetch todos", async () => {
        const response = await request(app)
            .get("/todos")
            .set("Authorization", auth)
            .send();

        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });

    test("fetch not exist todo", async () => {
        const response = await request(app)
            .get("/todos/-1")
            .set("Authorization", auth)
            .send();

        expect(response.status).toEqual(404);
        expect(response.body.message).toBeDefined();
    });
});

describe("PUT /todos", () => {
    test("update with invalid status", async () => {
        const response = await request(app)
            .put("/todos/-1")
            .set("Authorization", auth)
            .send({});

        expect(response.status).toEqual(422);
        expect(response.body.errors).toBeDefined();
    });
});
