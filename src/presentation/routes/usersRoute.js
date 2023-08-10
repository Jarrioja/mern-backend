import { Router } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import authenticate from '../middlewares/authenticate.js';
import authorization from '../middlewares/authtorization.js';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/', authorization('getUsers'), getUsers);
userRouter.get('/:id', authorization('getUser'), getUserById);
userRouter.post('/', authorization('saveUser'), createUser);
userRouter.put('/:id', authorization('updateUser'), updateUser);
userRouter.delete('/:id', authorization('deleteUser'), deleteUser);

export default userRouter;
