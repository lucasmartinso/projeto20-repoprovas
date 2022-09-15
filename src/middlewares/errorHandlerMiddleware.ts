import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) { 
    console.log(error); 
    if(error.type === "Unprocessable Entity") { 
        return res.status(422).send(error.message);
    } else if(error.type === "Conflit") { 
        return res.status(409).send(error.message);
    } else if(error.type === "Unauthorized") { 
        return res.status(401).send(error.message) 
    }
    res.sendStatus(500);
}