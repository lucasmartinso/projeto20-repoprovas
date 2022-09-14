import { users } from "@prisma/client";
import prisma from "../databases/prisma"; 

export async function createUser({email, password}: Omit<users, 'id' | 'createdAt'>): Promise<void> { 
    await prisma.users.create({ data: { email, password }}); 
}  

export async function findUser(email: string): Promise<users | null> {
    const result: users | null = await prisma.users.findUnique({ where: { email }});

    return result;
}  

export async function findUserById(id: number): Promise<users | null>  { 
    const result: users | null = await prisma.users.findUnique({ where: { id }});

    return result;
}