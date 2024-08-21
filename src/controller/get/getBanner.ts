import { NextFunction, Request, Response } from "express"
import { UserService } from "../../services/internal/userService"
import { Base } from "../baseController";
import { BannerService } from "../../services/internal/bannerService";


export class GetBanner extends Base {
    public method = "GET"
    public path = "/banner"
    private bannereService: BannerService;

    constructor() {
        super();
        this.bannereService = new BannerService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        const result = await this.bannereService.getBanner();
        this.response(Res,200,0,"Sukses",result);
    }
}