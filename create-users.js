import promisePool from './src/utils/database.js';

const createUsersTable = async () => {
  await promisePool.execute(`
    CREATE TABLE IF NOT EXISTS wsk_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(50) DEFAULT 'customer'
    )
  `);

  console.log('Users table ready');
  process.exit();
};

createUsersTable();
