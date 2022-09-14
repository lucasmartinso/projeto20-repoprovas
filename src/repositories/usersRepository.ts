import { users } from "@prisma/client";
import prisma from "../databases/prisma"; 

export async function createUser({email, password}: Omit<users, 'id' | 'createdAt'>): Promise<void> { 
    await prisma.users.create({ data: { email, password }}); 
}  

export async function findRepeteadEmail(email: string) {
    const result: users | null = await prisma.users.findUnique({ where: { email }});

    return result;
}