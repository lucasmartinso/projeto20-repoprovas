import { faker } from '@faker-js/faker';
import prisma from "../src/databases/prisma"; 

async function main() { 
    await prisma.terms.createMany({data: [ {number: 1},{number: 2},{number: 3},{number: 4},{number: 5},{number: 6},],skipDuplicates: true}); 

    const categories = [
        {name: "Projeto"}, 
        {name:"Recuperação"}, 
        {name:"Prática"},
    ]; 

    await prisma.categories.createMany({data: categories, skipDuplicates: true}); 

    const teachers = [
        {name: 'Diego Pinho'},
        {name: 'Bruna Hamori'},
    ];

    await prisma.teachers.createMany({data: teachers, skipDuplicates: true}); 

    const disciplines = [ 
        {name: 'HTML e CSS', termId: 1}, 
        {name: 'JavaScript', termId: 2}, 
        {name: 'React', termId: 3}, 
        {name: 'Humildade', termId: 1}, 
        {name: 'Planejamento', termId: 2},  
        {name: 'Autoconfiança', termId: 3}, 
    ] 

    await prisma.disciplines.createMany({data: disciplines, skipDuplicates: true});  

    const teachersDisciplines = [ 
        {teacherId: 1, disciplineId: 1},
        {teacherId: 1, disciplineId: 2}, 
        {teacherId: 1, disciplineId: 3}, 
        {teacherId: 2, disciplineId: 4}, 
        {teacherId: 2, disciplineId: 5}, 
        {teacherId: 2, disciplineId: 6}, 
    ] 

    await prisma.teachersDisciplines.createMany({data: teachersDisciplines, skipDuplicates: true});  
} 

main()
.catch(error => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });