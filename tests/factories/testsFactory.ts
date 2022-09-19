import { faker } from "@faker-js/faker";
import { teachers } from "@prisma/client";
import prisma from "../../src/databases/prisma";

export async function __createTests(categoryMatch: boolean, instructorMatch: boolean): Promise<{name: string;pdfUrl: string;categorie: string;discipline: string;instructor: string;}> { 
    const teachers: teachers[] = await prisma.teachers.findMany();
    console.log(teachers);
    
    return {
        name: await faker.random.alpha({ count: 10, casing: 'lower'}),
        pdfUrl: await faker.internet.url(),
        categorie: await faker.helpers.arrayElement(["Projeto","Prática","Recuperação"]),
        discipline: categoryMatch ? await faker.helpers.arrayElement(["HTML e CSS","JavaScript","React","Humildade","Planejamento","Autoconfiança"]) : await faker.lorem.words(1), 
        instructor: await faker.helpers.arrayElement(["Diego Pinho","Bruna Hamori"])
    }
}