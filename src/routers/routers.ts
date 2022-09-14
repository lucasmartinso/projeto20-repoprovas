import { Router } from "express"; 
import usersRouter from "./usersRouters";

const router = Router();

router.use(usersRouter); 

export default router;