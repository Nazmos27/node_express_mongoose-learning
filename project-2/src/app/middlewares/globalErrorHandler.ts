/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import Joi from 'joi';
import { TErrorSources } from '../global-interfaces/error.interfaces';
import config from '../config';
import handleJoiError from '../errors/handleJoiError';
import handleMongooseError from '../errors/handleMongooseError';
import handleCastError from '../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof Joi.ValidationError) {
    const simplifiedError = handleJoiError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(error?.name === 'CastError'){
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
