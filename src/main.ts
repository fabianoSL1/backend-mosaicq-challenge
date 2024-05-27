import express from "express";
import { routes } from "./routes";
import { handlerExceptions } from "./middlewares/handler-exceptions";

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(routes);

app.use(handlerExceptions);

app.listen(PORT, () => console.log("running on http://localhost:" + PORT));
