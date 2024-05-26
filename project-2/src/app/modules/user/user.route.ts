import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import userValidationSchema from './user.validation';
import Joi from 'joi';
import { studentValidations } from '../student/student.validation';

const router = express.Router();

//middleware to check validation
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

router.post(
  '/create-student',
  validateRequest(studentValidations.userValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
