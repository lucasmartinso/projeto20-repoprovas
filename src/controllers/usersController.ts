import { Request, Response } from "express"; 
import * as usersService from "../services/usersServices";

export async function signUp(req: Request, res: Response): Promise<void> { 
    const userData = req.body; 
    await usersService.createUser(userData);

    res.sendStatus(201);
} 

export async function login(req: Request, res: Response): Promise<void> { 
    const userData = req.body; 

    const token: string = await usersService.login(userData)
    res.status(200).send(token);
} 

export async function logout(req: Request, res: Response): Promise<void> { 
    const { email, password } = req.body; 

    res.sendStatus(204);
}