import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import authorization from '../middlewares/authtorization.js';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/roleController.js';

const roleRouter = Router();

roleRouter.use(authenticate);

roleRouter.get('/', authorization('getRoles'), getRoles);
roleRouter.get('/:id', authorization('getRole'), getRoleById);
roleRouter.post('/', authorization('creteRole'), createRole);
roleRouter.put('/:id', authorization('updateRole'), updateRole);
roleRouter.delete('/:id', authorization('deleteRole'), deleteRole);

export default roleRouter;
