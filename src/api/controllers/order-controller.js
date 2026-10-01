import {addOrder, getOrders} from '../models/order-model.js';

const postOrder = async (req, res) => {
  const orderData = {
    user_id: req.user.id,
    items: req.body.items,
    total_price: req.body.total_price,
  };
  const result = await addOrder(orderData);
  res.status(201).json(result);
};

const getUserOrders = async (req, res) => {
  const items = await getOrders(req.user.id);
  res.json(items);
};

export {postOrder, getUserOrders};
