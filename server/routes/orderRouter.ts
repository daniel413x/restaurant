import Router from 'express';
import OrderController from '../controllers/OrderController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  authMiddleware,
  (req, res) => OrderController.get(req, res),
);
router.get(
  '/all',
  checkRoleMiddleware(ADMIN),
  (req, res) => OrderController.getAllForAdmin(req, res),
);
router.get(
  '/activeorder',
  authMiddleware,
  (req, res) => OrderController.getActiveOrder(req, res),
);
router.post(
  '/',
  authMiddleware,
  (req, res) => OrderController.create(req, res),
);
router.put(
  '/:id',
  authMiddleware,
  (req, res) => OrderController.edit(req, res),
);
router.put(
  '/changestatus/:id',
  authMiddleware,
  (req, res, next) => OrderController.changeStatus(req, res, next),
);
router.delete(
  '/:id',
  authMiddleware,
  (req, res) => OrderController.delete(req, res),
);

export default router;
