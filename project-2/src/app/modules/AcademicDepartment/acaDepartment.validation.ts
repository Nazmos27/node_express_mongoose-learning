import Joi from 'joi';

// Define the Joi validation schema
export const createAcademicDepartmentValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Department name should be a type of text',
    'string.empty': 'Department name is required',
    'any.required': 'Department name is required',
  }),
  academicFaculty: Joi.string().messages({
    'string.base': 'Academic Faculty should be a type of text',
    'string.empty': 'Academic Faculty is required',
    'any.required': 'Academic Faculty is required',
  }),
});
export const updateAcademicDepartmentValidationSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Name should be a type of text',
  }),
  academicFaculty: Joi.string().messages({
    'string.base': 'Academic Faculty should be a type of text',
    'string.empty': 'Academic Faculty is required',
    'any.required': 'Academic Faculty is required',
  }),
});
