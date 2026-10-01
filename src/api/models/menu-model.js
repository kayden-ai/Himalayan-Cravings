import promisePool from '../../utils/database.js';

const getMenu = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_menu');
  return rows;
};

const addMenuItem = async (item) => {
  const sql =
    'INSERT INTO wsk_menu (name, description, price, category, dietary_tags) VALUES (?, ?, ?, ?, ?)';
  const params = [
    item.name,
    item.description,
    item.price,
    item.category,
    item.dietary_tags,
  ];
  const [result] = await promisePool.execute(sql, params);
  return {id: result.insertId};
};

export {getMenu, addMenuItem};
