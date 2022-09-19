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

async function getTestsPerDiscipline(period: any): Promise<void> { 
    let projects = []; 
    let recuperation = []; 
    let practice = [];
    for(let i=0; i<period.length; i++) { 
        const tests = await testsRepository.testsPerDiscipline(period[i].name);
        projects = tests.filter(element => element.category == "Projeto");
        recuperation = tests.filter(element => element.category == "Recuperação");
        practice = tests.filter(element => element.category == "Prática");
        period[i]= {...period[i], projects, recuperation, practice} 
    }
}

export async function getTests(): Promise<any[]> { 
    const disciplines: any[] = await testsRepository.disciplinesPerPeriod();
    const disciplinesPerPeriod: any[] = disciplines.map(element => element.json_build_object);

    for(let i=0; i<disciplinesPerPeriod.length; i++) { 
        await getTestsPerDiscipline(disciplinesPerPeriod[i].disciplines);
        disciplinesPerPeriod[i] = {period: disciplinesPerPeriod[i]};
    }

    
    return disciplinesPerPeriod;
}  

async function organizeTestsPerTeacher(teacher: teachers[], tests: any[]) { 
    let testsPerTeacher: any = teacher;
    let projects: any[] = []; 
    let recuperation: any[] = []; 
    let practice: any[] = [];
    let k =0;
    console.log(tests);

    for(let i=0; i<teacher.length; i++) { 
        if(tests[i].tests[i].teacherId !== teacher[i+k].id) { 
            testsPerTeacher[i+k] = {...testsPerTeacher[i+k], projects, recuperation, practice} 
            k++;
        }
        if(tests[i].tests[i].teacherId === teacher[i+k].id) { 
            for(let j=0; j<tests[i].tests.length; j++){
                delete tests[i].tests[j].teacherId;
                if(tests[i].tests[j].category==="Projeto") { 
                    projects.push(tests[i].tests[j]);
                } else if(tests[i].tests[j].category==="Recuperação") { 
                    recuperation.push(tests[i].tests[j]);
                } else if(tests[i].tests[j].category==="Prática") { 
                    practice.push(tests[i].tests[j]);
                } 
                delete tests[i].tests[j].category;
            }
            testsPerTeacher[i+k] = {...testsPerTeacher[i+k], projects, recuperation, practice}
            projects = []; 
            recuperation = []; 
            practice = [];
        } 
    } 

    return testsPerTeacher;
}

export async function getTestsPerTeacher(): Promise<any> {
    const teacher: teachers[] = await testsRepository.getTeachers(); 
    const tests: any[] = await testsRepository.testsPerTeachers(); 
    let mapTests: any
    let testsPerTeacher: any[] = []

    if(tests.length>0) {
        mapTests = tests.map(element => element.json_build_object);
        testsPerTeacher = await organizeTestsPerTeacher(teacher, mapTests);
    } else {
        for(let i=0; i<teacher.length; i++) { 
            testsPerTeacher[i] = {...teacher[i], projects: [], recuperation: [], practice: []}
        }
    }

    return testsPerTeacher;
}