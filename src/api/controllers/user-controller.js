import {addUser} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const postUser = async (req, res) => {
  const {name, username, email, password, role} = req.body;
  const hash = await bcrypt.hash(password, 10);

  const newUser = {
    name: name,
    username: username,
    email: email,
    password: hash,
    role: role || 'customer',
  };

  const result = await addUser(newUser);
  res.status(201).json(result);
};

export {postUser};
