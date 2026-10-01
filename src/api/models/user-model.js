import promisePool from '../../utils/database.js';

const addUser = async (user) => {
  const sql =
    'INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
  const params = [
    user.name,
    user.username,
    user.email,
    user.password,
    user.role,
  ];
  const [result] = await promisePool.execute(sql, params);
  return {id: result.insertId};
};

const getUserByUsername = async (username) => {
  const sql = 'SELECT * FROM wsk_users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0];
};

export {addUser, getUserByUsername};
