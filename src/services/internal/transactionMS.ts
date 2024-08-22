import { BaseService } from "../baseServie";

export class TransactionMS extends BaseService {
    constructor() {
        super()
        this.baseUrl = process.env.TRANSACTION_MS || "http://localhost:4000";
    }

    public async createAccount(user_id: string | undefined) {

        const dataAccount = await this.sendRequest({
            path: "/api/account",
            method: "post",
            data: {
                user_id: user_id
            }
        });
    }



   
}