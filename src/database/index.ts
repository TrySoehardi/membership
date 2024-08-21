// import mysql from 'mysql';

// // Create the connection to database
// export const connection = mysql.createConnection({
    
//   });

import Db from 'mysql2-async'
export const db = new Db({
    host: "localhost",
    user: "root",
    database: "membership",
    password: "try"
});
