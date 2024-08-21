import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
      userId: string
    }
}


export async function protectedRoute(Req: Request, Res: Response, Next: NextFunction) {
    const token = Req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return Res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secret-key');
        //@ts-ignore
        Req.userId = decoded.userId;
    // next();
    } catch (error) {
        console.log(error);
        return Res.status(401).json({
            "status": 108,
            "message": "Token tidak tidak valid atau kadaluwarsa",
            "data": null
          });
    }
    Next();
}