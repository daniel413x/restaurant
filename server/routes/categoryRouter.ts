import Router from 'express';
import CategoryController from '../controllers/CategoryController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/public',
  (req, res) => CategoryController.getPublic(req, res),
);
router.get(
  '/all',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => CategoryController.getAll(req, res),
);
router.post(
  '/',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => CategoryController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => CategoryController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({ accessRoles: [ADMIN] }),
  (req, res) => CategoryController.delete(req, res),
);

export default router;
