import { Request, Response, NextFunction }from "express"; 

export async function validateTokenAuth(req: Request, res: Response, next: NextFunction) {  
    console.log("bom dia");
    next();
}