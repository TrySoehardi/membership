import { Request, Response, NextFunction } from "express";
import Joi from "joi";


export class Base {

    protected async response(res: Response, status: number, statusCode: number,message: string,data: any):Promise<void> {
        const content = {
            status: statusCode,
            message: message,
            data: data
        }
        res.status(status).send(content);
    }

}