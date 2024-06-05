import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../global-interfaces/error.interfaces';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error, Invalid Id',
    errorSources: errorSources,
  };
};

export default handleCastError;
