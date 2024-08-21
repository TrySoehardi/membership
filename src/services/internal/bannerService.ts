import { BaseService } from "../baseServie";
import { BannerModel } from '../../model/bannerModel';

export class BannerService extends BaseService {
    private bannerModel: BannerModel;
    constructor() {
        super()
        this.bannerModel = new BannerModel;
    }

    public async getBanner() {
        const banners = await this.bannerModel.getAll();
        return banners;
    }
    
}