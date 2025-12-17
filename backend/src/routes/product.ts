import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/product';
import validateProduct from '../middlewares/validateProduct';

const router = Router();

router.get('/', getProducts);
router.post('/', validateProduct, createProduct);

export default router;
