import Router from 'express';
import OrderController from '../controllers/OrderController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, OrderController.get);
router.post('/', authMiddleware, OrderController.create);
router.put('/:id', authMiddleware, OrderController.edit);
router.put('/changeStatus/:id', authMiddleware, OrderController.changeStatus);
router.delete('/:id', authMiddleware, OrderController.delete);

export default router;
