import { NextFunction, Request, Response } from "express"
import { UserService } from "../../services/internal/userService"
import Joi, { required } from "joi";
import { Base } from "../baseController";


export class Login extends Base {
    public method = "POST"
    public path = "/login"
    private userService: UserService;

    constructor() {
        super();
        this.userService = new UserService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {

        // validation
        const bodyFormat = Joi.object({
            email :    Joi.string().email({minDomainSegments : 2, tlds : { allow : ["com", "net"]}}).required().messages({
                "string.email" : "Parameter email tidak sesuai format"
            }),
            password : Joi.string().required()

        });
        const validate = bodyFormat.validate(Req.body).error?.details
        if (validate) {
            this.response(Res,400,102,validate[0].message,null);
        } else {

            // login
        const result = await this.userService.login(Req.body);
        switch(true) {
            case result.code == 105 :
                this.response(Res,404,result.code,result.message,result.data);
            case result.code == 103 :
                this.response(Res,401,result.code,result.message,result.data);
            case result.code == 0 :
                this.response(Res,200,result.code,result.message,result.data);
            }
        }
    }
}