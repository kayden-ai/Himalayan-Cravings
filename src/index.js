import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import menuRouter from './api/routes/menu-router.js';
import userRouter from './api/routes/user-router.js';
import authRouter from './api/routes/auth-router.js';
import orderRouter from './api/routes/order-router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const announcementFilePath = path.join(__dirname, 'announcement.txt');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/menu', menuRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);

app.get('/announcement', (req, res) => {
  try {
    if (!fs.existsSync(announcementFilePath)) {
      return res.status(200).send('Welcome to Himalayan Cravings!');
    }
    const announcement = fs.readFileSync(announcementFilePath, 'utf8');
    res.status(200).send(announcement || 'Welcome to Himalayan Cravings!');
  } catch (error) {
    res.status(500).send('Welcome to Himalayan Cravings!');
  }
});

app.put('/announcement', (req, res) => {
  const {text} = req.body;
  if (!text) {
    return res.status(400).json({error: 'Announcement text is required.'});
  }

  try {
    fs.writeFileSync(announcementFilePath, text, 'utf8');
    res.status(200).json({message: 'Announcement updated successfully.'});
  } catch (error) {
    res.status(500).json({error: 'Failed to update announcement.'});
  }
});

const startServer = () => {
  app.listen(3000, () => {
    console.log('Server is runnig at port 3000');
  });
};

startServer();
