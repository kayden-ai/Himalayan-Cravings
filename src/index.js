import express from 'express';
import cors from 'cors';
import menuRouter from './api/routes/menu-router.js';
import userRouter from './api/routes/user-router.js';
import authRouter from './api/routes/auth-router.js';
import orderRouter from './api/routes/order-router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/menu', menuRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
const startServer = () => {
  app.listen(3000, () => {
    console.log(`Server is runnig at port 3000`);
  });
};

startServer();
