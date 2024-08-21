// import { Connection } from "mysql";
import {db} from "../database"

export interface banner {
    id?: any,
    banner_name?: string,
    banner_image?: string,
    description?: string
}

export class BannerModel {
    private db;
    constructor() {
        this.db = db;
    }

    public async getAll() {
        const query = "SELECT * FROM `banner`";
        const banners = await this.db.query(query);    
        return banners;    
    }

}

