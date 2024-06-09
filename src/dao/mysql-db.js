import dotenv from 'dotenv';
dotenv.config();

import { createPool } from 'mysql2';

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    multipleStatements: true
}

// Using console.log for logging
console.log(dbConfig);

const pool = createPool(dbConfig)

pool.on('connection', function (connection) {
    console.log(
        `Connected to database '${connection.config.database}' on '${connection.config.host}:${connection.config.port}'`
    )
})

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId)
})

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId)
})

export const getConnection = (callback) => {
    pool.getConnection(callback);
};

export default pool;
