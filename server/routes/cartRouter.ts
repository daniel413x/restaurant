import Router from 'express';
import CartController from '../controllers/CartController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, CartController.get);
router.post('/additem', authMiddleware, CartController.addItem);
router.put('/edititemquantity/:id', authMiddleware, CartController.editItemQuantity);
router.delete('/:id', authMiddleware, CartController.delete);

export default router;