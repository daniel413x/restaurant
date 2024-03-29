import Router from 'express';
import FoodItemInMenuController from '../controllers/FoodItemInMenuController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/:id',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res, next) => FoodItemInMenuController.getOne(req, res, next),
);
router.post(
  '/',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => FoodItemInMenuController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => FoodItemInMenuController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => FoodItemInMenuController.delete(req, res),
);

export default router;
