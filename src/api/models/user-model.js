import promisePool from '../../utils/database.js';

const fetchAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const fetchUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const insertUser = async (user) => {
  const {name, username, email, password, role = 'user'} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)`;
  const [rows] = await promisePool.execute(sql, [
    name,
    username,
    email,
    password,
    role,
  ]);

  if (rows.affectedRows === 0) {
    return false;
  }
  return {user_id: rows.insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'User successfully updated'};
};

const removeUser = async (id) => {
  // Grab a dedicated connection for the transaction
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);

    const [rows] = await connection.execute(
      'DELETE FROM wsk_users WERE user_id = ?',
      [id]
    );

    await connection.commit();

    if (rows.affectedRows === 0) {
      return false;
    }
    return {message: 'User and all their associated cats deleted'};
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const findUserByUsername = async (username) => {
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;
  const [rows] = await promisePool.execute(sql, [username]);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {
  fetchAllUsers,
  fetchUserById,
  insertUser,
  modifyUser,
  removeUser,
  findUserByUsername,
};
