import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

dotenv.config();

const poolConnection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
const db = drizzle(poolConnection, { logger: true });

poolConnection
  .getConnection()
  .then((connection) => {
    console.log('Connected to database');
    connection.release();
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });

export { db };
