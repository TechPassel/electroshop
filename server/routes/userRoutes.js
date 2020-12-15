import express from 'express';
import {
  authenticateUser,
  userProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authenticateUser);
router.get('/profile', protect, userProfile);

export default router;
