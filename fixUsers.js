import promisePool from './src/utils/database.js';

const fixUsersTable = async () => {
  await promisePool.execute(
    "ALTER TABLE wsk_users ADD COLUMN role VARCHAR(50) DEFAULT 'user'"
  );
  console.log('Fixed users table');
  process.exit();
};

fixUsersTable();
