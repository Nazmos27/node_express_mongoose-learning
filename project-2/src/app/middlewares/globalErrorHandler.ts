/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import Joi from 'joi';
import { TErrorSource } from '../global-interfaces/errorSource.interface';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handleJoiError = (error : Joi.ValidationError) => {
    const errorSources : TErrorSource = error.details.map((detail: any) => ({
      path: detail?.path[detail.path.length-1],
      message: detail.message,
    }));
    statusCode = 400
    return {
      statusCode,
      message : "Validation error",
      errorSources
      
    }
  }

  if (error instanceof Joi.ValidationError) {
    const simplifiedError = handleJoiError(error)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack :config.node_env === 'development' ? error?.stack : null
  });
};

export default globalErrorHandler;
