import { NextFunction, Request, Response } from "express"
import { UserService } from "../../services/internal/userService"
import Joi, { required } from "joi";
import { Base } from "../baseController";


export class PutProfile extends Base {
    public method = "PUT"
    public path = "/profile/update"
    private userService: UserService;

    constructor() {
        super();
        this.userService = new UserService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
         // validation
         const bodyFormat = Joi.object({
            first_name : Joi.string().required(),
            last_name : Joi.string().required()

        });
        const validate = bodyFormat.validate(Req.body).error?.details
        if (validate) {
            this.response(Res,400,102,validate[0].message,null);
        } else {
            let user = Req.body;
            user.id = Req.userId; 
            const update = await this.userService.updateProfile(user);
            this.response(Res,200,0,"Update Pofile berhasil", update);
        }


    }
}