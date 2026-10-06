import {getUserByEmail} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({message: 'User not found'});
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({message: 'Wrong password'});
    }

    const token = jwt.sign(
      {id: user.id, role: user.role},
      process.env.JWT_SECRET || 'secret',
      {expiresIn: '24h'}
    );

    res.json({token: token, message: 'Login successful'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export {login};
