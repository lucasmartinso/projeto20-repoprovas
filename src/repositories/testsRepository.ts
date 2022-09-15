import { categories, disciplines, teachers, teachersDisciplines, tests } from "@prisma/client";
import prisma from "../databases/prisma"; 

export async function createTest(testsData: Omit<tests, 'id'>): Promise<void> { 
    await prisma.tests.create({ data: testsData}); 
}  

export async function findCategory(name: string): Promise<categories | null> {
    const result: categories | null = await prisma.categories.findUnique({where: { name }});

    return result;
}  

export async function findDiscipline(discipline: string): Promise<disciplines | null> { 
    const result: disciplines | null = await prisma.disciplines.findUnique({where: {name: discipline}});

    return result;
} 

export async function findTearcher(name: string): Promise<teachers | null> {
    const result: teachers | null = await prisma.teachers.findUnique({ where: {name}}); 

    return result;
} 

export async function findTearcherDiscipline(disciplineId: number | undefined, teacherId: number | undefined): Promise<teachersDisciplines | null> {
    const result: teachersDisciplines | null = await prisma.teachersDisciplines.findFirst({ where: {disciplineId, teacherId}}); 

    return result;
}