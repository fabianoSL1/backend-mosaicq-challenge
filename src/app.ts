import cors from "cors";
import express from "express";
import { routes } from "./routes";
import { exceptionsMiddleware } from "./middlewares/exceptionsMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(exceptionsMiddleware);

export { app };
