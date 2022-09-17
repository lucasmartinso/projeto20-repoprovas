import { Request, Response } from "express"; 
import * as testsService from "../services/testsServices";
import { createTest } from "../types/types";

export async function createTests(req: Request, res: Response): Promise<void> { 
    const testData: createTest = req.body; 
    await testsService.createTests(testData);

    res.sendStatus(201);
}  

export async function getTests(req: Request, res: Response) { 
    const tests: any[] = await testsService.getTests();
    
    res.status(200).send(tests);
} 

export async function getTestsPerTeacher(req: Request, res: Response) { 
    const testsPerTeacher = await testsService.getTestsPerTeacher();
    
    res.status(200).send(testsPerTeacher);
} 
