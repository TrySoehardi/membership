import Db from 'mysql2-async'


export const db = new Db({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});
