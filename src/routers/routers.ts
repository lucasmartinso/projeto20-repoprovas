import { Router } from "express"; 
import usersRouter from "./usersRouters";
import { validateTokenAuth } from "../middlewares/authMiddleware";
import testRouter from "./testRouter";

const router = Router();

router.use(usersRouter); 
router.use(validateTokenAuth);
router.use(testRouter);

export default router;