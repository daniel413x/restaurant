import Router from 'express';
import CategoryController from '../controllers/CategoryController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => CategoryController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => CategoryController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => CategoryController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => CategoryController.delete(req, res),
);

export default router;
