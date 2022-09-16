import { categories, disciplines, teachers, teachersDisciplines, tests } from "@prisma/client";
import * as testsRepository from "../repositories/testsRepository";
import { createTest } from "../types/types";

async function findTest(name: string) { 
    const test: tests | null = await testsRepository.findTest(name); 
    if(test) throw { type: "Conflit", message: "This test name already exist at database"};
}

async function findCategoryId(categorie: string): Promise<number> { 
    const category: categories | null = await testsRepository.findCategory(categorie);
    if(!category) throw { type: "Not Found", message: "That category don't exist in the database"};

    return category?.id;
} 

async function findTeacherDisciplineId(instructor: string, discipline: string): Promise<number> { 
    const disciplines: disciplines | null = await testsRepository.findDiscipline(discipline);
    if(!disciplines) throw { type: "Not Found", message: "This discipline don't exist in the database"};

    const teacher: teachers | null = await testsRepository.findTearcher(instructor);
    if(!teacher) throw { type: "Not Found", message: "This teacher don't exist in the database"};


    const teacherDiscipline: teachersDisciplines | null = await testsRepository.findTearcherDiscipline(disciplines?.id,teacher?.id);
    if(!teacherDiscipline) throw { type: "Not Found", message: "This teachersDisciplines don't exist in the database"};

    return teacherDiscipline?.id;
} 

export async function createTests(testData: createTest): Promise<void> { 
    await findTest(testData.name);
    const categoryId: number = await findCategoryId(testData.categorie);

    const teacherDisciplineId: number = await findTeacherDisciplineId(testData.instructor,testData.discipline);

    const testInfo: Omit<tests, 'id'> = { 
        name: testData.name, 
        pdfUrl: testData.pdfUrl, 
        categoryId, 
        teacherDisciplineId
    } 

    await testsRepository.createTest(testInfo);
}  

async function getTestsPerDiscipline(period: any) { 
    for(let i=0; i<period.length; i++) { 
        const tests = await testsRepository.testsPerDiscipline(period[i].name);
        period[i]= {...period[i], tests} 
    }
}

export async function getTests() { 
    const disciplines = await testsRepository.disciplinesPerPeriod();
    const disciplinesPerPeriod = disciplines.map(element => element.json_build_object);

    for(let i=0; i<disciplinesPerPeriod.length; i++) { 
        await getTestsPerDiscipline(disciplinesPerPeriod[i].disciplines);
    }

    
    return disciplinesPerPeriod;
}