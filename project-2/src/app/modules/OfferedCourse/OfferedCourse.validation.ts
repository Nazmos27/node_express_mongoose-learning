import Joi, { CustomHelpers } from 'joi';
import { Days } from './OfferedCourse.constant';
import { TOfferedCourse } from './OfferedCourse.iterface';

// Custom time string validation
const timeStringSchema = Joi.string()
  .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'HH:MM')
  .messages({
    'string.pattern.base':
      'Invalid time format, expected "HH:MM" in 24 hours format',
  });

// Create Joi validation schema
export const createOfferedCourseValidationSchema = Joi.object({
  semesterRegistration: Joi.string().required(),
  academicFaculty: Joi.string().required(),
  academicDepartment: Joi.string().required(),
  course: Joi.string().required(),
  faculty: Joi.string().required(),
  section: Joi.number().required(),
  maxCapacity: Joi.number().required(),
  days: Joi.array()
    .items(Joi.string().valid(...Days))
    .required(),
  startTime: timeStringSchema.required(), // Validate time format
  endTime: timeStringSchema.required(), // Validate time format
}).custom((value: TOfferedCourse, helpers: CustomHelpers) => {
  const start = new Date(`1970-01-01T${value.startTime}:00`);
  const end = new Date(`1970-01-01T${value.endTime}:00`);

  if (end <= start) {
    return helpers.error('any.invalid', {
      message: 'Start time should be before End time!',
    });
  }
  return value;
}, 'Start time should be before End time validation');

// export const createOfferedCourseValidationSchema = Joi.object({
//       semesterRegistration: Joi.string().required(),
//       academicFaculty: Joi.string().required(),
//       academicDepartment: Joi.string().required(),
//       course: Joi.string().required(),
//       faculty: Joi.string().required(),
//       section: Joi.number().required(),
//       maxCapacity: Joi.number().required(),
//       days: Joi.array().items(Joi.string().valid(...Days)).required(),
//       startTime: Joi.string().required(),
//       endTime: Joi.string().required()
//   });

export const updateOfferedCourseValidationSchema = Joi.object({
  faculty: Joi.string(),
  maxCapacity: Joi.number(),
  days: Joi.array().items(Joi.string().valid(...Days)),
  startTime: timeStringSchema.required(), // Validate time format
  endTime: timeStringSchema.required(), // Validate time format
}).custom((value: TOfferedCourse, helpers: CustomHelpers) => {
  const start = new Date(`1970-01-01T${value.startTime}:00`);
  const end = new Date(`1970-01-01T${value.endTime}:00`);

  if (end <= start) {
    return helpers.error('any.invalid', {
      message: 'Start time should be before End time!',
    });
  }
  return value;
}, 'Start time should be before End time validation');
