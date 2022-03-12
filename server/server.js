import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

app.use(express.json());

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.use(notFound);

app.use(errorHandler);
