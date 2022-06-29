import Router from 'express';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import foodItemRouter from './foodItemRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/fooditem', foodItemRouter);

export default router;
