import express from 'express';
import {
  authenticateUser,
  getUserDetails,
  registerUser,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authenticateUser);
router.get('/:id', protect, getUserDetails);
router.put('/', protect, updateUser);

export default router;
