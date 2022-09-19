import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import routers  from "./routers/routers"
import errorHandler from "./middlewares/errorHandlerMiddleware";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(routers);
app.use(errorHandler);

export default app;