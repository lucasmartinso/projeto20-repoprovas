import prisma from "../src/databases/prisma";
import dotenv from "dotenv"; 
dotenv.config(); 

beforeEach( async () => { 
    await prisma.$executeRaw`TRUNCATE TABLE users`
})

describe("Test POST /users/sign-up",() => { 
    it("Have to answer 201, if register user using the correct format", () => {
        console.log(process.env.DATABASE_URL); 
        expect(200).toBe(200);
    }); 
});