import promisePool from './src/utils/database.js';

const seedOrders = async () => {
  const createOrdersTable = `
        CREATE TABLE IF NOT EXISTS wsk_orders (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            items_json JSON NOT NULL,
            total_price DECIMAL(10,2) NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

  await promisePool.execute(createOrdersTable);
  console.log('Orders table created successfully!');
  process.exit();
};

seedOrders();
