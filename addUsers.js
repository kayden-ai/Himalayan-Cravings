import promisePool from './src/utils/database.js';

const addUsersTable = async () => {
  await promisePool.execute(`
    CREATE TABLE IF NOT EXISTS wsk_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        email VARCHAR(255)
    )
  `);
  console.log('Users table created');
  process.exit();
};

addUsersTable();
