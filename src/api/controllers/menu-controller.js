import {getMenu, addMenuItem} from '../models/menu-model.js';

const getMenuItems = async (req, res) => {
  const items = await getMenu();
  res.json(items);
};

const postMenuItem = async (req, res) => {
  const result = await addMenuItem(req.body);
  res.status(201).json(result);
};

export {getMenuItems, postMenuItem};
