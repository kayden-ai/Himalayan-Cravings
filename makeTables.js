import promisePool from './src/utils/database.js';

const makeTables = async () => {
  await promisePool.execute('DROP TABLE IF EXISTS wsk_menu');
  await promisePool.execute('DROP TABLE IF EXISTS wsk_orders');

  await promisePool.execute(`
        CREATE TABLE wsk_menu (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            price DECIMAL(10,2),
            category VARCHAR(255),
            dietary_tags VARCHAR(255),
            image_filename VARCHAR(255)
        )
    `);

  await promisePool.execute(`
        CREATE TABLE wsk_orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            items_json JSON,
            total_price DECIMAL(10,2),
            status VARCHAR(50) DEFAULT 'pending'
        )
    `);

  console.log('Tables created');
  process.exit();
};

makeTables();
