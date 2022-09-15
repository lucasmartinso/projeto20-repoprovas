import { Router } from "express"; 
import { createTests } from "../controllers/testsController";
import schemaValidation from "../middlewares/validationSchemas";
import { testSchema } from "../schemas/testSchemas";

const testRouter = Router();

testRouter.post("/tests", schemaValidation(testSchema),createTests); 

export default testRouter;