import Router from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { REGISTERED } from '../utils/consts';

const router = Router();

router.get('/auth', authMiddleware, UserController.auth);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.put('/', checkRoleMiddleware(REGISTERED), UserController.edit);
router.delete('/:id', UserController.delete);

export default router;
