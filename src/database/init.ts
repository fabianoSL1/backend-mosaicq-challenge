import { Client } from "pg";
import { connection } from "./config";
import { TodoStatus } from "../todo/entities/todoStatus";

init_database();

async function init_database() {
    const client = await connectEnsurreSuccess();
    await dropTableTodo(client);
    await createTableTodo(client);
    await client.end();
}

async function connectEnsurreSuccess(): Promise<Client> {
    try {
        const client = new Client(connection);
        await client.connect();
        return client;
    } catch {
        const { database, ...credentials } = connection;
        const client = new Client(credentials);

        await client.connect();
        await client.query("create database " + database);
        await client.end();

        return connectEnsurreSuccess();
    }
}

async function dropTableTodo(client: Client) {
    const stmt = "DROP TABLE IF EXISTS todo";
    await client.query(stmt);
}

async function createTableTodo(client: Client) {
    await createTypeTodoStatus(client);
    
    const stmt = `CREATE TABLE IF NOT EXISTS todo (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        describe VARCHAR(255) NOT NULL,
        status Todo_status NOT NULL DEFAULT 'PENDING',
        createAt timestamp NOT NULL
    )`;
    
    await client.query(stmt);
}


async function createTypeTodoStatus(client: Client) {
    const todoStatus = Object.keys(TodoStatus).map(status => `'${status}'`);
    const statusStmt = `CREATE TYPE Todo_status as ENUM (${todoStatus.join(',')})`;

    await client.query(statusStmt);
}


