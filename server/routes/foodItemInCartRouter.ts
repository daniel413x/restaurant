import Router from 'express';
import FoodItemInCartController from '../controllers/FoodItemInCartController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { GUEST, REGISTERED } from '../utils/consts';

const router = Router();

router.post(
  '/',
  checkRoleMiddleware({ accessRoles: [GUEST, REGISTERED] }),
  (req, res) => FoodItemInCartController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware({ accessRoles: [GUEST, REGISTERED] }),
  (req, res) => FoodItemInCartController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({ accessRoles: [GUEST, REGISTERED] }),
  (req, res) => FoodItemInCartController.deleteItem(req, res),
);

export default router;
