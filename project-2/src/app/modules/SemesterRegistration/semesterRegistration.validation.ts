import Joi from 'joi';
import { semesterRegistrationStatus } from './semesterRegistration.constant';

export const createSemesterRegistrationValidationSchema = Joi.object({
  academicSemester: Joi.string().required(),
  status: Joi.string()
    .valid(...semesterRegistrationStatus)
    .default('UPCOMING'),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  minCredit: Joi.number().default(3).required(),
  maxCredit: Joi.number().default(15).required(),
});
export const updateSemesterRegistrationValidationSchema = Joi.object({
  academicSemester: Joi.string().optional(),
  status: Joi.string()
    .valid(...semesterRegistrationStatus)
    .default('UPCOMING'),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  minCredit: Joi.number().default(3).optional(),
  maxCredit: Joi.number().default(15).optional(),
});
