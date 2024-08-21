// import { Connection } from "mysql";
import {db} from "../database"
import {v1 as uuidv1} from "uuid";
import bcrypt from "bcrypt"

export interface user {
    id?: any,
    first_name?: string,
    last_name?: string,
    email: string,
    password:string
    image_profile?: string | null,
    created_at?: Date,
    updated_at?: Date | null
}

export class UserModel {

    public async create(user:user) {

        const query = "INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `image_profile`,`created_at`, `updated_at`) VALUES (?)";
        const id = uuidv1();
        const data = [
            id, // id
            user.first_name,
            user.last_name,
            user.email,
            await bcrypt.hash(user.password, 10),
            null,
            new Date,
            null
        ]
        const result = await db.query(query,[data]);
        const userData = await this.findById(id);
        return userData;
    }

    public async findByEmail(email: string) {
        const query = "SELECT * FROM user WHERE email=? LIMIT 1"
        const row = await db.getrow(query, [email]);
        return row;
    }

    public async findById(id: string) {
        const query = "SELECT * FROM user WHERE id = ? LIMIT 1"
        const row = await db.getrow(query, [id]);
        return row;
    }

    public async update(user:user) {
        user.updated_at = new Date();
        const query = "UPDATE user SET ? WHERE id = ?"
        await db.getrow(query, [
            user,
            user.id
        ]);
        const updated = await this.findById(user.id);
        return updated;
    }

}

