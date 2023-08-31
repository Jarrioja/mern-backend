import { Router } from 'express';
import { payOrder } from '../controllers/paymentController.js';

import authenticate from '../../presentation/middlewares/authenticate.js';

const paymentRouter = Router();

paymentRouter.post('/:orderId', authenticate, payOrder);

export default paymentRouter;
