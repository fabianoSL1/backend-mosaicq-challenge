import express from "express";
import { routes } from "./routes";
import { exceptionsMiddleware } from "./middlewares/exceptionsMiddleware";

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(routes);

app.use(exceptionsMiddleware);

app.listen(PORT, () => console.log("running on http://localhost:" + PORT));
