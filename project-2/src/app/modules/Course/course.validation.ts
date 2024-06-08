import Joi from 'joi';
import mongoose from 'mongoose';

// Utility function to validate ObjectId
const validateObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
};

// PreRequisite Course Validation Schema
const PreRequisiteCourseValidationSchema = Joi.object({
  course: Joi.string().custom(validateObjectId).required(),
  isDeleted: Joi.boolean().optional(),
});

// Create Course Validation Schema
const createCourseValidationSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    prefix: Joi.string().required(),
    code: Joi.number().required(),
    credits: Joi.number().required(),
    preRequisiteCourses: Joi.array().items(PreRequisiteCourseValidationSchema).optional(),
    isDeleted: Joi.boolean().optional(),
  }),
});

// Update PreRequisite Course Validation Schema
const updatePreRequisiteCourseValidationSchema = Joi.object({
  course: Joi.string().custom(validateObjectId).required(),
  isDeleted: Joi.boolean().optional(),
});

// Update Course Validation Schema
const updateCourseValidationSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().optional(),
    prefix: Joi.string().optional(),
    code: Joi.number().optional(),
    credits: Joi.number().optional(),
    preRequisiteCourses: Joi.array().items(updatePreRequisiteCourseValidationSchema).optional(),
    isDeleted: Joi.boolean().optional(),
  }),
});

// Faculties With Course Validation Schema
const facultiesWithCourseValidationSchema = Joi.object({
  body: Joi.object({
    faculties: Joi.array().items(Joi.string().custom(validateObjectId)).required(),
  }),
});

// Export all validation schemas
export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
};
