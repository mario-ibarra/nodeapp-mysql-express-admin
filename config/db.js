import mysql from 'mysql';
import util from 'util';
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    connectionLimit: 1000,
    host:       process.env.DB_HOST,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASSWORD,
    database:   process.env.DB_NAME,
    multipleStatements: true
});

// Check for connections errors:
pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('Database Error: Connection was closed.');
        }
         else if (err.code === 'ER_CON_COUNT_ERROR'){
            console.log('Database Error: Database has too many connections.');
        }
         else if (err.code === 'ECONNREFUSED'){
            console.log('Database Error: Connection was refused.');
        }
    }
    if(connection) connection.release();
    return;
});

// Pool to use async/await when running do queries
pool.query = util.promisify(pool.query);

export default pool;