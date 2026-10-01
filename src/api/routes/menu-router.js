import express from 'express';
import {getMenuItems, postMenuItem} from '../controllers/menu-controller.js';
import {checkToken} from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', checkToken, postMenuItem);

export default router;
