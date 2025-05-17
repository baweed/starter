/* eslint-disable import/extensions */
import { Router } from 'express';
import tourRouter from './tourRoutes.js';
import userRouter from './userRoutes.js';
import AppError from '../utils/appError.js';

const router = Router();

router.use('/tours', tourRouter);
router.use('/users', userRouter);
// router.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

export default router;
