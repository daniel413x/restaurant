import Router from 'express';
import userRouter from './userRouter';
import addressRouter from './addressRouter';
import categoryRouter from './categoryRouter';
import foodItemInMenuRouter from './foodItemInMenuRouter';
import foodItemInCartRouter from './foodItemInCartRouter';
import cartRouter from './cartRouter';
import orderRouter from './orderRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/address', addressRouter);
router.use('/category', categoryRouter);
router.use('/fooditeminmenu', foodItemInMenuRouter);
router.use('/fooditemincart', foodItemInCartRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

export default router;
