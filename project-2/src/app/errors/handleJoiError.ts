import Joi from 'joi';
import { TErrorSources, TGenericErrorResponse } from '../global-interfaces/error.interfaces';

const handleJoiError = (error: Joi.ValidationError) : TGenericErrorResponse => {
  const errorSources: TErrorSources = error.details.map((detail) => ({
    path: detail?.path[detail.path.length - 1],
    message: detail.message,
  }));
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleJoiError;
