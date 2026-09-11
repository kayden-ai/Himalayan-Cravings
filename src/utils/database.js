import mysql from 'mysql2';
// This will load variables from .env file to process.env
import 'dotenv/config';

// Create the connection pool.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// promise pool is asynchronous version of the pool and
// returns promises, which is used with async/await syntax
const promisePool = pool.promise();
export default promisePool;
