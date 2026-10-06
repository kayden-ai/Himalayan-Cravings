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
  return result;
};

const getUserByEmail = async (email) => {
  const sql = 'SELECT * FROM wsk_users WHERE email = ?';
  const [rows] = await promisePool.execute(sql, [email]);
  return rows[0];
};

export {addUser, getUserByEmail};
