import mysql from 'mysql2/promise';
import dbConfig from "../config/db.config";

// Create a connection pool
export const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on expected traffic
    queueLimit: 0,
    connectTimeout: 60000,  // Timeout for connection attempts
});
