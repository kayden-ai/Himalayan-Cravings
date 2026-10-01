import express from 'express';
import {postUser} from '../controllers/user-controller.js';

const router = express.Router();

router.post('/', postUser);

export default router;
