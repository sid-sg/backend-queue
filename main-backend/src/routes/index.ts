import express from 'express';
import userRouter from './user';
import requestRouter from './request';
// const accountRouter = require('./account');
// const Users = require('../db')
const router = express.Router();

router.use('/user',userRouter);
router.use('/request',requestRouter);
// router.use('/account',accountRouter);

export default router;