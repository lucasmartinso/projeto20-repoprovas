import { Router } from "express"; 
import { signUp, login, logout } from "../controllers/usersController";
import { validateTokenAuth } from "../middlewares/authMiddleware";
import schemaValidation from "../middlewares/validationSchemas";
import { signUpSchema, loginSchema } from "../schemas/usersSchema"

const usersRouter = Router();

usersRouter.post("/users/sign-up", schemaValidation(signUpSchema),signUp); 
usersRouter.post("/users/sign-in", schemaValidation(loginSchema),login); 
usersRouter.delete("/users/logout", validateTokenAuth,logout); 

export default usersRouter;