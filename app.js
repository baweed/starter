/* eslint-disable import/extensions */
import express from 'express';

import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
// 1 MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('./public'));
app.use((req, res, next) => {
  console.log('Hello from the middleware 🙏');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3 ROUTES

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

export default app;
