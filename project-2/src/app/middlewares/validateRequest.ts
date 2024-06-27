import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validateRequest = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(error);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;

// catchAsync(async (req, res, next) => {
//   const { error } = schema.validate(req.body);
//   if (error) {
//     return next(error);
//   }
//   next();

// }) cleaner code of above code
