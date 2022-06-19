import Router from 'express';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);

export default router;
