import express from 'express';
import { addOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", protect, addOrder);

export default router;