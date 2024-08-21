import { NextFunction, Request, Response } from "express"
import { UserService } from "../../services/internal/userService"
import Joi, { required } from "joi";
import { Base } from "../baseController";


export class Registration extends Base {
    public method = "POST"
    public path = "/registration"
    private userService: UserService;

    constructor() {
        super();
        this.userService = new UserService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {

        // validation
        const bodyFormat = Joi.object({
            first_name : Joi.string().required(),
            last_name : Joi.string().required(),
            email :    Joi.string().email({minDomainSegments : 2, tlds : { allow : ["com", "net"]}}).required().messages({
                "string.email" : "Parameter email tidak sesuai format"
            }),
            password : Joi.string().required()

        });
        const validate = bodyFormat.validate(Req.body).error?.details
        if (validate) {
            this.response(Res,400,102,validate[0].message,null);
        } else {
            // create User
        const result = await this.userService.register(Req.header('Authorization'), Req.body);
        this.response(Res,200,result.code,result.message,result.data);
        }
        // `````````````````````````````````

        
    }
}