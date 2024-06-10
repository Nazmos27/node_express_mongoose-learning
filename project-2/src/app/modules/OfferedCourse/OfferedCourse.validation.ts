import Joi from "joi";
import { Days } from "./OfferedCourse.constant";

export const createOfferedCourseValidationSchema = Joi.object({
      semesterRegistration: Joi.string().required(),
      academicFaculty: Joi.string().required(),
      academicDepartment: Joi.string().required(),
      course: Joi.string().required(),
      faculty: Joi.string().required(),
      section: Joi.number().required(),
      maxCapacity: Joi.number().required(),
      days: Joi.array().items(Joi.string().valid(...Days)).required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required()
  });

  export const updateOfferedCourseValidationSchema = Joi.object({
    faculty: Joi.string().optional(),
    maxCapacity: Joi.number().optional(),
    days: Joi.array().items(Joi.string().valid(...Days)).optional(),
    startTime: Joi.string().optional(),
    endTime: Joi.string().optional()
});

