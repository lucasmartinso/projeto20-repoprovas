import { faker } from "@faker-js/faker";
import { disciplines, teachers, teachersDisciplines } from "@prisma/client";
import prisma from "../../src/databases/prisma";

export async function __createTests(allowCreate: boolean,categoryMatch: boolean, instructorMatch: boolean): Promise<{name: string;pdfUrl: string;categorie: string;discipline: string;instructor: string;}> { 
    const teachers: teachers[] = await prisma.teachers.findMany();
    const teachersName: string[] = teachers.map(t => t.name);
    const disciplines: disciplines[] = await prisma.disciplines.findMany();
    const disciplinesName: string[] = disciplines.map(d => d.name);
    const randomDiscipline = await faker.helpers.arrayElement(disciplinesName);
    const tecaherChosed: string = await faker.helpers.arrayElement(teachersName);
    let disciplineName: disciplines | null = null;

    if(allowCreate) { 
        const teacherChosedId: teachers | undefined = teachers.find(t => t.name === tecaherChosed);
        const disciplinesId: teachersDisciplines | null = await prisma.teachersDisciplines.findFirst({ where: {teacherId: teacherChosedId?.id}});
        disciplineName = await prisma.disciplines.findFirst({ where: { id: disciplinesId?.disciplineId}});
        console.log(disciplineName);
    }
    
    return {
        name: await faker.random.alpha({ count: 10, casing: 'lower'}),
        pdfUrl: await faker.internet.url(),
        categorie: await faker.helpers.arrayElement(["Projeto","Prática","Recuperação"]),
        discipline: categoryMatch ? (allowCreate ? (disciplineName ? disciplineName.name : randomDiscipline) : randomDiscipline) : await faker.lorem.words(1), 
        instructor: instructorMatch ? tecaherChosed : await faker.lorem.words(2)
    }
}