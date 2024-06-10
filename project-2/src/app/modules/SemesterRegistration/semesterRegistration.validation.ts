import Joi from "joi";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";

export const createSemesterRegistrationValidationSchema = Joi.object({
    academicSemester: Joi.string().required(),
  status: Joi.string().valid(...semesterRegistrationStatus).default('UPCOMING'),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  minCredit: Joi.number().default(3),
  maxCredit: Joi.number().default(15),
})

