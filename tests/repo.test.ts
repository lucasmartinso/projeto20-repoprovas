import prisma from "../src/databases/prisma";
import dotenv from "dotenv"; 
import { __createUser } from "./factories/userFactory";
import supertest from "supertest";
import app from "../src";
import { signUp, createTest } from "../src/types/types";
import { __createTests } from "./factories/testsFactory";
import { faker } from "@faker-js/faker";
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

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword });

        password = "wrongPassword";
        const { status, body } = await supertest(app).post("/users/sign-in").send({ email,password });
        console.log(body);

        expect(status).toBe(409); 
        expect(body.token).toEqual(undefined);
    }); 

    it("Have to answer 409, if the user send the wrong email, and the token is null", async() => { 
        let { email, password, confirmPassword }: signUp = await __createUser(true); 

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword });

        email = "wrongEmail@gmail.com";
        const { status, body } = await supertest(app).post("/users/sign-in").send({ email,password });

        expect(status).toBe(409); 
        expect(body.token).toEqual(undefined);
    });
}); 

describe("Test POST /tests", () => { 
    it.todo("Have to answer 201, if the user send the corretly data")/*, async () => { 
        const { email, password, confirmPassword }: signUp = await __createUser(true);

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword }); 
        const { body } = await supertest(app).post("/users/sign-in").send({ email,password });

        const testData: createTest = await __createTests(true,true);

        const { status } = await supertest(app).post("/tests").set("Authorization", body.token).send(testData);

        expect(status).toBe(201);
    });*/ 

    it("Have to answer 401, if the user send his info don't following the schema rules", async()=> { 
        const testData: object = {}; 
        const { status } = await supertest(app).post("/tests").send(testData);

        expect(status).toBe(401);
    })

    it("Have to answer 422, if the user send his info don't following the schema rules", async()=> { 
        const testData: object = {}; 
        const { email, password, confirmPassword }: signUp = await __createUser(true);

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword }); 
        const { body } = await supertest(app).post("/users/sign-in").send({ email,password }); 

        const { status } = await supertest(app).post("/tests").set("Authorization", body.token).send(testData);

        expect(status).toBe(422);
    }); 

    it("Have to answer 404, if user try to registreted a test's discipline already exist", async() => { 
        const { email, password, confirmPassword }: signUp = await __createUser(true);

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword }); 
        const { body } = await supertest(app).post("/users/sign-in").send({ email,password }); 

        const testData: createTest = await __createTests(false,true);

        const { status } = await supertest(app).post("/tests").set("Authorization", body.token).send(testData);

        expect(status).toBe(404);
    }); 

    it("Have to answer 404, if user try to register test with a tecaher that does't exist at database", async ()=> { 
        const { email, password, confirmPassword }: signUp = await __createUser(true);

        await supertest(app).post("/users/sign-up").send({ email,password,confirmPassword }); 
        const { body } = await supertest(app).post("/users/sign-in").send({ email,password }); 

        const testData: createTest = await __createTests(true,false);
        console.log(testData);

        const { status } = await supertest(app).post("/tests").set("Authorization", body.token).send(testData);

        expect(status).toBe(404);
    })

    it.todo("Have to answer 409, if user try to registreted a test's name already exist")
})