import Router from 'express';
import CartController from '../controllers/CartController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get(
  '/',
  authMiddleware,
  (req, res) => CartController.get(req, res),
);

export default router;
