/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/appRoutes.js';

import errorController from './controllers/errorController.js';

dotenv.config();

const app = express();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`./public`));

app.use('/api/v1', appRouter);

app.use(errorController);

export default app;
