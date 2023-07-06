import Router from 'express';
import CartController from '../controllers/CartController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { GUEST, REGISTERED } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware({ accessRoles: [GUEST, REGISTERED] }),
  (req, res) => CartController.get(req, res),
);

export default router;
