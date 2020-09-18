import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import errorMiddleware from './middlewares/errorMiddleware';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export default app;
