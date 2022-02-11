import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
// We can define routes in following manner also.
// router.route('/').get(getProducts);
// router.route('/:id').get(getProductById);

export default router;
