import express from "express";
import { routes } from "./routes";
import { handlerExceptions } from "./middleware/handler-exceptions";

const app = express();

app.use(express.json());

app.use(handlerExceptions);

app.use(routes);

app.listen(3000);