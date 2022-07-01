import Router from 'express';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import foodItemRouter from './foodItemRouter';
import cartRouter from './cartRouter';
import orderRouter from './orderRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/fooditem', foodItemRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

export default router;
