import Router from 'express';
import FoodItemInCartController from '../controllers/FoodItemInCartController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post(
  '/',
  authMiddleware,
  (req, res) => FoodItemInCartController.create(req, res),
);
router.put(
  '/:id',
  authMiddleware,
  (req, res) => FoodItemInCartController.edit(req, res),
);
router.delete(
  '/:id',
  authMiddleware,
  (req, res) => FoodItemInCartController.deleteItem(req, res),
);

export default router;
