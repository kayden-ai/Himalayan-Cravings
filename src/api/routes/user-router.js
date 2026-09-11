import express from 'express';
import {body} from 'express-validator';
import {
  retrieveUsers,
  retrieveUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(retrieveUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrors,
    createUser
  );

userRouter
  .route('/:id')
  .get(retrieveUserById)
  .put(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
