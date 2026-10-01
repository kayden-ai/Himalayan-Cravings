import express from 'express';
import {postOrder, getUserOrders} from '../controllers/order-controller.js';
import {checkToken} from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', checkToken, postOrder);
router.get('/', checkToken, getUserOrders);

export default router;
