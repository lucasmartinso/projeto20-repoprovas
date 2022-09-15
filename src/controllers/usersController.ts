import { users } from "@prisma/client";
import { Request, Response } from "express"; 
import * as usersService from "../services/usersServices";
import { signUp } from "../types/types";

export async function signUp(req: Request, res: Response): Promise<void> { 
    const userData: signUp = req.body; 
    await usersService.createUser(userData);

    res.sendStatus(201);
} 

export async function login(req: Request, res: Response): Promise<void> { 
    const userData: Omit<users, 'id' | 'createdAt'>  = req.body; 

    const token: string = await usersService.login(userData)
    res.status(200).send(token);
} 