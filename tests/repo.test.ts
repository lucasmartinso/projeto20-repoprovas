import prisma from "../src/databases/prisma";
import dotenv from "dotenv"; 
import { __createUser } from "./factories/userFactories";
import supertest from "supertest";
import app from "../src";
import { signUp, test } from "../src/types/types";
import { tests } from "@prisma/client";
dotenv.config(); 

beforeEach( async () => { 
    await prisma.$executeRaw`TRUNCATE TABLE users`
    await prisma.$executeRaw`TRUNCATE TABLE tests`
}); 

afterAll( async () => { 
    await prisma.$disconnect();
});

describe("Test POST /users/sign-up", () => { 
    it("Have to answer 201, if register user using the correct format", async () => {
        const userData: signUp = await __createUser(true);

        const { status } = await supertest(app).post("/users/sign-up").send(userData);
        
        expect(status).toBe(201);
    });  

    it("Have to answer 422, if the user send his info don't following the schema rules", async () => { 
        const userData: object = {}; 

        const { status } = await supertest(app).post("/users/sign-up").send(userData); 

        expect(status).toBe(422);
    }); 

    it("Have to answer 409, if the password and the confirmPassword aren't the same", async() => { 
        const userData: signUp = await __createUser(false); 

        const { status } = await supertest(app).post("/users/sign-up").send(userData);

        expect(status).toBe(409);
    }); 

    it("Have to answer 409, if the user try to registreted the email twice", async () => {
        const userData: signUp = await __createUser(true); 

        await supertest(app).post("/users/sign-up").send(userData); 
        const { status } = await supertest(app).post("/users/sign-up").send(userData); 

        expect(status).toBe(409);
    })

}); 

describe("Test POST /users/sign-in", () => { 

    it("Have to answer 201, if registred user send his email and password corretly, and send the token at corretly form", async() => { 
        const { email, password, confirmPassword }: signUp = await __createUser(true);

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword }); 

        const { status, body } = await supertest(app).post("/users/sign-in").send({ email,password });

        expect(status).toBe(200);
        expect(body.token).not.toBeNull();
    }); 

    it("Have to answer 409, if the user send the wrong password, and the token is null", async() => { 
        let { email, password, confirmPassword }: signUp = await __createUser(true); 
        password = "wrongPassword";

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword });
        const { status, body } = await supertest(app).post("/users/sign-in").send({ email,password });
        console.log(body);

        expect(status).toBe(409); 
        expect(body.token).toEqual(undefined);
    }); 

    it("Have to answer 409, if the user send the wrong email, and the token is null", async() => { 
        let { email, password, confirmPassword }: signUp = await __createUser(true); 
        email = "wrongEmail";

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword });
        const { status, body } = await supertest(app).post("/users/sign-in").send({ email,password });
        console.log(body);

        expect(status).toBe(409); 
        expect(body.token).toEqual(undefined);
    });
}); 

describe("Test POST /tests", () => { 
    it("Have to answer 201, if the user send the corretly data", () => { 
        const testData: tests = ;
    })
})