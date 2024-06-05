import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../global-interfaces/error.interfaces';

const handleMongooseError = (err: mongoose.Error.ValidationError) : TGenericErrorResponse=> {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};

export default handleMongooseError;
