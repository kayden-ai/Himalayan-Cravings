import promisePool from './src/utils/database.js';

const addName = async () => {
  await promisePool.execute(
    'ALTER TABLE wsk_users ADD COLUMN name VARCHAR(255)'
  );
  console.log('Name column added');
  process.exit();
};

addName();
