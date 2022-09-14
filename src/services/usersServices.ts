import { users } from "@prisma/client";
import * as cripts from "../utils/cripts/encryptDescrypt";
import * as usersRepository from "../repositories/usersRepository";
import { signUp } from "../types/types"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function findEmail(email: string): Promise<users | null> {
    const findRepeteadEmail: users | null = await usersRepository.findUser(email);

    return findRepeteadEmail;
} 

export async function createUser({email, password, confirmPassword }: signUp): Promise<void> { 
    if(password !== confirmPassword) throw { type: "Conflit", message: "Password and confirm password are not the same" };
    const findRepeteadEmail: users | null = await findEmail(email);
    if(findRepeteadEmail) throw { type: "Conflit", message: "This email already exist" };

    const criptPassword: string = await cripts.encriptByBcrypt(password);
    const userData: Omit<users, 'id' | 'createdAt'> = {
        email, 
        password: criptPassword
    }  

    await usersRepository.createUser(userData);
} 

async function gerateToken(userId: number, email: string): Promise<string> {
    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? ''; 
    const EXPIRES_IN: string | undefined = process.env.EXPIRES_IN;

    const payload = {
        userId, 
        email, 
        level: 1
    }

    const jwtConfig = { 
        expiresIn: EXPIRES_IN
    }

    const token: string = await jwt.sign(payload,SECRET,jwtConfig);

    return token;
}

export async function login({ email, password }: Omit<users, 'id' | 'createdAt'>): Promise<string> { 
    const existEmail: users | null = await findEmail(email);
    if(!existEmail) throw { type: "Conflit", message: "Email or password are wrong" }; 

    const descriptPassword: boolean = await cripts.descriptByBcrypt(existEmail.password,password); 
    if(!descriptPassword) throw { type: "Conflit", message: "Email or password are wrong" }; 

    const token: string = await gerateToken(existEmail.id, existEmail.email);

    return token;
} 

export async function findUserById(userId: number): Promise<users | null>  { 
    const user: users | null = await usersRepository.findUserById(userId);

    return user;
}