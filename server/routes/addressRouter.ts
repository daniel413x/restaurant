import Router from 'express';
import AddressController from '../controllers/AddressController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { REGISTERED } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware(REGISTERED),
  (res, req) => AddressController.get(res, req),
);
router.post(
  '/',
  checkRoleMiddleware(REGISTERED),
  (res, req, next) => AddressController.create(res, req, next),
);
router.put(
  '/:id',
  checkRoleMiddleware(REGISTERED),
  (res, req) => AddressController.edit(res, req),
);
router.delete(
  '/:id',
  checkRoleMiddleware(REGISTERED),
  (res, req) => AddressController.delete(res, req),
);

export default router;
