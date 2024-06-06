import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../global-interfaces/error.interfaces';

const handleDuplicateError = (err): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMsg = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMsg} already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate key:value error',
    errorSources,
  };
};

export default handleDuplicateError;
