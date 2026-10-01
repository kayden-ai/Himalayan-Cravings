import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {getUserByUsername} from '../models/user-model.js';

const login = async (req, res) => {
  const {username, password} = req.body;
  const user = await getUserByUsername(username);

  if (!user) {
    return res.status(401).json({message: 'Invalid credentials'});
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({message: 'Invalid credentials'});
  }

  const token = jwt.sign(
    {id: user.user_id, role: user.role},
    'my_temporary_secret_key',
    {expiresIn: '24h'}
  );

  res.json({token, role: user.role});
};

export {login};
