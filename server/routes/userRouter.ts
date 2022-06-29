import Router from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/auth', authMiddleware, UserController.auth);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.delete('/delete/:id', UserController.delete);

export default router;
