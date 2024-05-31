import Joi from 'joi';
import { monthEnum, semesterNameEnum, semesterCodeEnum } from './acaSem.model';

// Joi validation schema for academic semester
export const academicSemesterValidationSchema = Joi.object({
  name: Joi.string()
    .valid(...semesterNameEnum)
    .required()
    .messages({
      'any.required': 'Semester name is required',
      'any.only': 'Semester name must be one of {{#valids}}',
    }),
  code: Joi.string()
    .valid(...semesterCodeEnum)
    .required()
    .messages({
      'any.required': 'Semester code is required',
      'any.only': 'Semester code must be one of {{#valids}}',
    }),
  year: Joi.string().required().messages({
    'any.required': 'Year is required',
  }),
  startMonth: Joi.string()
    .valid(...monthEnum)
    .required()
    .messages({
      'any.required': 'Start month is required',
      'any.only': 'Start month must be one of {{#valids}}',
    }),
  endMonth: Joi.string()
    .valid(...monthEnum)
    .required()
    .messages({
      'any.required': 'End month is required',
      'any.only': 'End month must be one of {{#valids}}',
    }),
});
export const updateSemesterValidationSchema = Joi.object({
  name: Joi.string()
    .valid(...semesterNameEnum)
    .optional()
    .messages({
      'any.required': 'Semester name is required',
      'any.only': 'Semester name must be one of {{#valids}}',
    }),
  code: Joi.string()
    .valid(...semesterCodeEnum)
    .optional()
    .messages({
      'any.required': 'Semester code is required',
      'any.only': 'Semester code must be one of {{#valids}}',
    }),
  year: Joi.string().optional().messages({
    'any.required': 'Year is required',
  }),
  startMonth: Joi.string()
    .valid(...monthEnum)
    .optional()
    .messages({
      'any.required': 'Start month is required',
      'any.only': 'Start month must be one of {{#valids}}',
    }),
  endMonth: Joi.string()
    .valid(...monthEnum)
    .optional()
    .messages({
      'any.required': 'End month is required',
      'any.only': 'End month must be one of {{#valids}}',
    }),
});
