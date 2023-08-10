import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authenticate from '../middlewares/authenticate.js';
import authorization from '../middlewares/authtorization.js';
const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/', authenticate, authorization('createProduct'), createProduct);
productRouter.put('/:productId', authenticate, authorization('updateProduct'), updateProduct);
productRouter.delete('/:productId', authenticate, authorization('deleteProduct'), deleteProduct);

export default productRouter;
