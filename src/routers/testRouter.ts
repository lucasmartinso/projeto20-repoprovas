import { Router } from "express"; 
import { createTests, getTests, getTestsPerTeacher } from "../controllers/testsController";
import schemaValidation from "../middlewares/validationSchemas";
import { testSchema } from "../schemas/testSchemas";

const testRouter = Router();

testRouter.post("/tests", schemaValidation(testSchema),createTests);  
testRouter.get("/tests", getTests); 
testRouter.get("/tests/teachers",getTestsPerTeacher);

export default testRouter;