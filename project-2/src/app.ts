/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();
// const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  Promise.reject(); //this line for checking unhandledRejection error
  res.send('hello world');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
