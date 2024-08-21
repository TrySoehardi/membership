import { NextFunction, Request, Response } from "express"
import { UserService } from "../../services/internal/userService"
import Joi, { required } from "joi";
import { Base } from "../baseController";


export class GetProfile extends Base {
    public method = "GET"
    public path = "/profile"
    private userService: UserService;

    constructor() {
        super();
        this.userService = new UserService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        const profile = await this.userService.getProfile(Req.userId);
        this.response(Res,200,0,"Sukses",profile);
    }
}