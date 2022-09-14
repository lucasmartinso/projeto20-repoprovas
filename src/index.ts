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

const PORT: number = Number(process.env.PORT) || 4200;

app.listen(PORT, () => {
  console.log(`\nListening server on port: ${PORT}`);
});