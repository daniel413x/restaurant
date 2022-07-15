import Router from 'express';
import FoodItemInMenuController from '../controllers/FoodItemInMenuController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

/*
router.get(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => FoodItemInMenuController.get(req, res),
);
*/
router.post(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => FoodItemInMenuController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => FoodItemInMenuController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => FoodItemInMenuController.delete(req, res),
);

export default router;
