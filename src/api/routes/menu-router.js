import express from 'express';
import promisePool from '../../utils/database.js';

const menuRouter = express.Router();

menuRouter.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_menu');
    res.json(rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

menuRouter.post('/', async (req, res) => {
  try {
    const {name, description, price, category, dietary_tags, image_filename} =
      req.body;
    const sql =
      'INSERT INTO wsk_menu (name, description, price, category, dietary_tags, image_filename) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await promisePool.execute(sql, [
      name,
      description,
      price,
      category,
      dietary_tags,
      image_filename,
    ]);
    res
      .status(201)
      .json({
        id: result.insertId,
        name,
        description,
        price,
        category,
        dietary_tags,
        image_filename,
      });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

menuRouter.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await promisePool.execute('DELETE FROM wsk_menu WHERE id = ?', [id]);
    res.json({message: 'Item deleted'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default menuRouter;
