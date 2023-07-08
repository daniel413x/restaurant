import Router from 'express';
import UserController from '../controllers/UserController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import authMiddleware from '../middleware/authMiddleware';
import { GUEST, REGISTERED } from '../utils/consts';
// import validateUserFormMiddleware from '../middleware/validateUserFormMiddleware';

const router = Router();

router.get(
  '/auth',
  authMiddleware,
  (req, res) => UserController.auth(req, res),
);
router.post(
  '/registration',
  // validateUserFormMiddleware,
  (req, res) => UserController.registration(req, res),
);
router.put(
  '/registration/guest',
  checkRoleMiddleware({ accessRoles: [GUEST] }),
  (req, res) => UserController.registrationGuest(req, res),
);
router.post(
  '/login',
  (req, res, next) => UserController.login(req, res, next),
);
router.put(
  '/',
  checkRoleMiddleware({ accessRoles: [REGISTERED] }),
  (req, res) => UserController.edit(req, res),
);
router.delete(
  '/:id',
  (req, res) => UserController.delete(req, res),
);

export default router;
