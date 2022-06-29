import Router from 'express';
import FoodItemController from '../controllers/FoodItemController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

// router.get('/:id', checkRoleMiddleware(ADMIN), FoodItemController.get);
router.post('/', checkRoleMiddleware(ADMIN), FoodItemController.create);
router.put('/:id', checkRoleMiddleware(ADMIN), FoodItemController.edit);
router.delete('/:id', checkRoleMiddleware(ADMIN), FoodItemController.delete);

export default router;
