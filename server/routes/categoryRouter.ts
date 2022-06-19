import Router from 'express';
import CategoryController from '../controllers/CategoryController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get('/', CategoryController.get);
router.post('/', checkRoleMiddleware(ADMIN), CategoryController.create);
router.put('/:id', checkRoleMiddleware(ADMIN), CategoryController.edit);
router.delete('/:id', checkRoleMiddleware(ADMIN), CategoryController.delete);

export default router;
