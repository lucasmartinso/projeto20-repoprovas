import { Router } from "express"; 
import { signUp, login } from "../controllers/usersController";
import schemaValidation from "../middlewares/validationSchemas";
import { signUpSchema, loginSchema } from "../schemas/usersSchema"

const usersRouter = Router();

usersRouter.post("/users/sign-up", schemaValidation(signUpSchema),signUp); 
usersRouter.post("/users/sign-in", schemaValidation(loginSchema),login); 

export default usersRouter;