import express from 'express';
import promisePool from '../../utils/database.js';

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
  try {
    const {items, total_price} = req.body;
    const items_json = JSON.stringify(items);
    const sql =
      'INSERT INTO wsk_orders (items_json, total_price, status) VALUES (?, ?, ?)';
    const [result] = await promisePool.execute(sql, [
      items_json,
      total_price,
      'pending',
    ]);
    res.status(201).json({id: result.insertId});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

orderRouter.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM wsk_orders ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

orderRouter.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;
    await promisePool.execute('UPDATE wsk_orders SET status = ? WHERE id = ?', [
      status,
      id,
    ]);
    res.json({message: 'Updated'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default orderRouter;
