import Router from 'express';
import OrderController from '../controllers/OrderController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get('/', authMiddleware, OrderController.get);
router.get('/allorders', checkRoleMiddleware(ADMIN), OrderController.getAll);
router.get('/activeorder', authMiddleware, OrderController.getActiveOrder);
router.post('/', authMiddleware, OrderController.create);
router.put('/:id', authMiddleware, OrderController.edit);
router.put('/changestatus/:id', authMiddleware, OrderController.changeStatus);
router.delete('/:id', authMiddleware, OrderController.delete);

export default router;
