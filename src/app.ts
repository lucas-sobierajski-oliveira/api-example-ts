import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import apiSchema from './api.schema.json';

import errorMiddleware from './middlewares/errorMiddleware';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));

app.use(routes);
app.use(errorMiddleware);

export default app;
