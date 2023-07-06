import Router from 'express';
import OrderController from '../controllers/OrderController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { REGISTERED, ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware({ accessRoles: [REGISTERED] }),
  (req, res) => OrderController.get(req, res),
);
router.get(
  '/all',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => OrderController.getAllForAdmin(req, res),
);
router.get(
  '/activeorder',
  checkRoleMiddleware({ accessRoles: [REGISTERED] }),
  (req, res) => OrderController.getActiveOrder(req, res),
);
router.get(
  '/guest/activeorder',
  authMiddleware,
  (req, res) => OrderController.getActiveGuestOrder(req, res),
);
router.post(
  '/',
  checkRoleMiddleware({ accessRoles: [REGISTERED] }),
  (req, res) => OrderController.create(req, res),
);
router.post(
  '/guest',
  authMiddleware,
  (req, res) => OrderController.guestCreate(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware({ accessRoles: [REGISTERED] }),
  (req, res) => OrderController.edit(req, res),
);
router.put(
  '/changestatus/:id',
  checkRoleMiddleware({ accessRoles: [REGISTERED] }),
  (req, res) => OrderController.changeStatus(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({ accessRoles: [REGISTERED] }),
  (req, res) => OrderController.delete(req, res),
);

export default router;
