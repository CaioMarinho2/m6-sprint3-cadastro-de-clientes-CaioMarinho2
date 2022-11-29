import express from "express";
import { appRoutes } from "./routes";

const app = express();
app.use(express.json());

appRoutes(app)

app.get("/", (request, response) => {
    return response.send("Hello Kenzie23");
    });

export default app;
