import express from 'express';
import userRouter from './user';
import requestRouter from './request';

const router = express.Router();

router.use('/user',userRouter);
router.use('/request',requestRouter);

export default router;