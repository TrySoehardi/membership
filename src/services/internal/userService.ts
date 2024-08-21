import { UserModel, user } from "../../model/userModel";
import { v1 as uuidv4 } from 'uuid';
import { BaseService } from "../baseServie";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { TransactionMS } from './transactionMS';

export class UserService extends BaseService {
    private userModel: UserModel;
    private transactionMS: TransactionMS;
    private uuid: any;
    constructor() {
        super()
        this.userModel = new UserModel;
        this.uuid = uuidv4
        this.baseUrl = "http://localhost:000"
        this.transactionMS = new TransactionMS;
    }

    public async register(token: string | undefined, user:user) {
        const exists = await this.userModel.findByEmail(user.email);
        if(exists) {
            return this.returnData(102,"email exists",null);
        } else {
            const dataUser = await this.userModel.create(user);
            await this.transactionMS.createAccount(dataUser.id);
            return this.returnData(0,"Registrasi berhasil silahkan login", dataUser);

        }
    }

    public async login(user:user) {
        const exists = await this.userModel.findByEmail(user.email);
        if(!exists) {
            return this.returnData(105,"Akun tidak ditemukan", null);
        }
        const passwordMatch = await bcrypt.compare(user.password, exists.password);
        if(!passwordMatch) {
            return this.returnData(103,"Username atau password salah",null);
        }
        const secretKey = process.env.SECRET_KEY || "secret-key";
        const token = jwt.sign({ userId: exists.id }, secretKey, {
            expiresIn: '12h',
            });
        return this.returnData(0,"Login Sukses",token); 
    }

    public async getProfile(id:string) {
        const result = await this.userModel.findById(id);
        return result;
    }

    public async updateProfile(user:user) {
        const result = await this.userModel.update(user);
        return result;
    }
}