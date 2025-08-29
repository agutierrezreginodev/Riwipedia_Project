
import mysql from "mysql2"
import express from 'express'
import dotenv from "dotenv"
dotenv.config()

export const app = express();


const pool = mysql.createPool({

    connectionLimit: 10,
    host : process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
 
});

const promisePool = pool.promise();
export default promisePool