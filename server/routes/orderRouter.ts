import Router from 'express';
import OrderController from '../controllers/OrderController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { REGISTERED, ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware(REGISTERED),
  (req, res) => OrderController.get(req, res),
);
router.get(
  '/all',
  checkRoleMiddleware(ADMIN),
  (req, res) => OrderController.getAllForAdmin(req, res),
);
router.get(
  '/activeorder',
  checkRoleMiddleware(REGISTERED),
  (req, res) => OrderController.getActiveOrder(req, res),
);
router.get(
  '/guest/activeorder',
  authMiddleware,
  (req, res) => OrderController.getActiveGuestOrder(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(REGISTERED),
  (req, res) => OrderController.create(req, res),
);
router.post(
  '/guest',
  authMiddleware,
  (req, res) => OrderController.guestCreate(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware(REGISTERED),
  (req, res) => OrderController.edit(req, res),
);
router.put(
  '/changestatus/:id',
  checkRoleMiddleware(REGISTERED),
  (req, res) => OrderController.changeStatus(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(REGISTERED),
  (req, res) => OrderController.delete(req, res),
);

export default router;
