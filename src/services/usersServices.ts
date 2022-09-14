import { users } from "@prisma/client";
import * as cripts from "../utils/cripts/encryptDescrypt";
import * as usersRepository from "../repositories/usersRepository";
import { signUp } from "../types/types"

async function repeteadEmail(email: string): Promise<void> {
    const findRepeteadEmail: users | null = await usersRepository.findRepeteadEmail(email);
    
    if(findRepeteadEmail) throw { type: "Conflit", message: "This email already exist" };
}

export async function createUser({email, password, confirmPassword }: signUp): Promise<void> { 
    if(password !== confirmPassword) throw { type: "Conflit", message: "Password and confirm password are not the same" };
    await repeteadEmail(email);
    
    const criptPassword: string = await cripts.encrypt(password);
    const userData: Omit<users, 'id' | 'createdAt'> = {
        email, 
        password: criptPassword
    }  

    await usersRepository.createUser(userData);
}