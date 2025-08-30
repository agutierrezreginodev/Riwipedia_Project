
import mysql from "mysql2"
import express, { text } from 'express'
import dotenv from "dotenv"

dotenv.config()

export const app = express();


const pool = mysql.createPool({

    connectionLimit: 10,
    host : process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
 
});

const promisePool = pool.promise();
export default promisePool

