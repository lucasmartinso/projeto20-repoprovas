import { Request, Response } from "express"; 
import * as testsService from "../services/testsServices";
import { createTest } from "../types/types";

export async function createTests(req: Request, res: Response): Promise<void> { 
    const testData: createTest = req.body; 
    await testsService.createTests(testData);

    res.sendStatus(201);
} 
