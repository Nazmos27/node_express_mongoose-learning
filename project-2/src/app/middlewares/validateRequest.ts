import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateRequest = (schema: Joi.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 'error',
            message: error.details[0].message,
          });
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  };

export default validateRequest