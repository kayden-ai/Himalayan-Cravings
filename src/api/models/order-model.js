import promisePool from '../../utils/database.js';

const addOrder = async (order) => {
  const sql =
    'INSERT INTO wsk_orders (user_id, items_json, total_price) VALUES (?, ?, ?)';
  const params = [
    order.user_id,
    JSON.stringify(order.items),
    order.total_price,
  ];
  const [result] = await promisePool.execute(sql, params);
  return {id: result.insertId};
};

const getOrders = async (userId) => {
  const sql = 'SELECT * FROM wsk_orders WHERE user_id = ?';
  const [rows] = await promisePool.execute(sql, [userId]);
  return rows;
};

export {addOrder, getOrders};
