import "reflect-metadata";
import express from "express";
import cors from "cors"
import "express-async-errors";
import { appRoutes } from "./routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();
app.use(cors());
app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
