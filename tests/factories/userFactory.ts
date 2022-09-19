import { faker } from "@faker-js/faker";

export async function __createUser(matchPassword: boolean) { 
    const password: string = await faker.internet.password(10,true,/^[a-zA-Z0-9]{10,}/);
    
    return {
        email: await faker.internet.email(),
        password: password,
        confirmPassword: matchPassword ? password : (await faker.internet.password(10,true,/^[a-zA-Z0-9]{10,}/))
    }
}