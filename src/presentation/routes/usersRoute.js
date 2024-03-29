import { Router } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  setPremiumUser,
  uploadDocuments,
  softDeleteInactiveUsers,
} from '../controllers/userController.js';
import authenticate from '../middlewares/authenticate.js';
import authorization from '../middlewares/authtorization.js';
import upload from '../middlewares/upload.js';

const userRouter = Router();

userRouter.delete('/', softDeleteInactiveUsers);

userRouter.use(authenticate);

userRouter.get('/', authorization('getUsers'), getUsers);
userRouter.get('/:id', authorization('getUser'), getUserById);
userRouter.post('/', authorization('saveUser'), createUser);
userRouter.put('/:id', authorization('updateUser'), updateUser);
userRouter.put('/premium/:id', authorization('updateUser'), setPremiumUser);
userRouter.delete('/:id', authorization('deleteUser'), deleteUser);
userRouter.post(
  '/:id/documents',
  upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  uploadDocuments,
);

export default userRouter;
