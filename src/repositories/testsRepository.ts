import { categories, disciplines, teachers, teachersDisciplines, tests } from "@prisma/client";
import prisma from "../databases/prisma"; 
import connection from "../databases/postgres";

export async function createTest(testsData: Omit<tests, 'id'>): Promise<void> { 
    await prisma.tests.create({ data: testsData}); 
}  

export async function findTest(name: string): Promise<tests | null> { 
    const result: tests | null = await prisma.tests.findUnique({ where: {name}}); 

    return result;
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

export async function disciplinesPerPeriod(): Promise<any[]> {
    const {rows: result} = await connection.query(`
        SELECT json_build_object( 
        'disciplines', json_agg(json_build_object( 
            'id', d.id, 
            'name', d.name, 
            'period', terms.number
        )))
        FROM disciplines d 
        JOIN terms ON d."termId" = terms.id 
        GROUP BY terms.number
        `);

    return result;
} 

export async function testsPerDiscipline(name: string): Promise<any[]> { 
    const {rows: result} = await connection.query(`
        SELECT t.id, t.name AS project, ts.name AS teacher, c.name AS category
        FROM tests t
        JOIN "teachersDisciplines" td ON td.id = t."teacherDisciplineId" 
        JOIN teachers ts ON ts.id = td."teacherId" 
        JOIN disciplines d ON d.id = td."disciplineId" 
        JOIN categories c ON c.id = t."categoryId"
        WHERE d.name = $1 
        GROUP BY c.name, t.id, ts.name
    `,[name]); 

    return result;
}  

export async function getTeachers(): Promise<teachers[]> { 
    const result: teachers[] = await prisma.teachers.findMany(); 

    return result;
}

export async function testsPerTeachers(): Promise<any> { 
    const { rows: result } = await connection.query(`
    SELECT json_build_object( 
        'tests', json_agg(json_build_object( 
            'id', t.id, 
            'test', t.name, 
            'category', c.name, 
            'teacherId', ts.id,
            'discipline', d.name
        )))
    FROM teachers ts
    JOIN "teachersDisciplines" td ON td."teacherId" = ts.id
    JOIN tests t ON t."teacherDisciplineId" = td.id
    JOIN categories c ON c.id = t."categoryId" 
    JOIN disciplines d ON d.id = td."disciplineId"
    GROUP BY ts.id
    `) 
   
    return result;
}