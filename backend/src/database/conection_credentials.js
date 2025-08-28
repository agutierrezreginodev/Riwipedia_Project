
import mysql from "mysql2"
import express from 'express'
export const app = express();
const pool = mysql.createPool({

    connectionLimit: 10,
    host : 'bh5qgzyovoctmznlasjq-mysql.services.clever-cloud.com',
    user: 'uwyoncd21embs2yp',
    password: 'uwyoncd21embs2yp',
    database: 'bh5qgzyovoctmznlasjq'
 
});

const promisePool = pool.promise();
export default promisePool