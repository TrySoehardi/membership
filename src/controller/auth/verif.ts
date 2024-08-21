import { NextFunction, Request, Response } from "express"
import { UserService } from "../../services/internal/userService"
import Joi, { required } from "joi";
import { Base } from "../baseController";


export class Verif extends Base {
    public method = "GET"
    public path = "/auth"

    constructor() {
        super();
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        this.response(Res,200,0,"Berhasil",Req.userId);
     
    }
}