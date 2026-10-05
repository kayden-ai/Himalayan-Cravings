import promisePool from './src/utils/database.js';

const runTestOrder = async () => {
  // 1. Simulate the JSON data coming from Milan's shopping cart
  const dummyCart = JSON.stringify([
    {id: 1, name: 'Chicken Mo:Mo', quantity: 2, price: 8.5},
    {id: 10, name: 'Mango Lassi', quantity: 2, price: 4.0},
  ]);
  const totalPrice = 25.0; // (8.50 * 2) + (4.00 * 2)

  // 2. Insert it into your orders table
  const insertSql = `INSERT INTO wsk_orders (user_id, items_json, total_price, status) VALUES (?, ?, ?, ?)`;
  await promisePool.execute(insertSql, [1, dummyCart, totalPrice, 'pending']);
  console.log('✅ Test order successfully inserted!');

  // 3. Read the table to prove the data is saved
  const [rows] = await promisePool.execute('SELECT * FROM wsk_orders');
  console.log('📦 Current Orders in Database:', rows);

  process.exit();
};

runTestOrder();
