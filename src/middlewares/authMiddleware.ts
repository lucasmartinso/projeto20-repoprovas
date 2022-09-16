import { Request, Response, NextFunction }from "express"; 
import * as usersService from "../services/usersServices";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "@prisma/client";
dotenv.config();

export async function validateTokenAuth(req: Request, res: Response, next: NextFunction) {  
    const token = req.headers['authorization'];

    if(!token) throw { type: "Unauthorized", message: "Insert token to enter"} 

    try {
        const SECRET: string = process.env.TOKEN_SECRET_KEY ?? ''; 
        const { userId } = jwt.verify(token, SECRET) as { userId: number}
        const user: users | null = await usersService.findUserById(userId);
        res.locals.user = user;
        next();
    } catch (error) {
        throw { type: "Unauthorized", message: "Invalid token"}; 
    }
}