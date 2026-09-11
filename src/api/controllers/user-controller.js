import bcrypt from 'bcrypt';
import {
  fetchAllUsers,
  fetchUserById,
  insertUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const retrieveUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const retrieveUserById = async (req, res) => {
  try {
    const user = await fetchUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching user by id:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const createUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const newUser = await insertUser(req.body);
    if (newUser) {
      res
        .status(201)
        .json({message: 'User added successfully', result: newUser});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const updateUser = async (req, res) => {
  try {
    if (
      res.locals.user.user_id !== Number(req.params.id) &&
      res.locals.user.role !== 'admin'
    ) {
      return res.sendStatus(403);
    }

    const result = await modifyUser(req.body, req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteUser = async (req, res) => {
  try {
    if (
      res.locals.user.user_id !== Number(req.params.id) &&
      res.locals.user.role !== 'admin'
    ) {
      return res.sendStatus(403);
    }

    const result = await removeUser(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {retrieveUsers, retrieveUserById, createUser, updateUser, deleteUser};
