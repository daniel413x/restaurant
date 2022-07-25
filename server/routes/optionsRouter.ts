import Router from 'express';
import OptionsController from '../controllers/OptionsController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/:name',
  (req, res) => OptionsController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => OptionsController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => OptionsController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => OptionsController.delete(req, res),
);

export default router;
