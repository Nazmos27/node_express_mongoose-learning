import Joi from 'joi';
import { BloodGroup, Gender } from './faculty.constant';

// Create User Name Validation Schema
const createUserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(20)
    .pattern(/^[A-Z]/)
    .messages({
      'string.pattern.base': 'First Name must start with a capital letter',
    })
    .required(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required(),
});

// Create Faculty Validation Schema
export const createFacultyValidationSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().max(20).required(),
    faculty: Joi.object({
      designation: Joi.string().required(),
      name: createUserNameValidationSchema,
      gender: Joi.string().valid(...Gender).required(),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().email().required(),
      contactNo: Joi.string().required(),
      emergencyContactNo: Joi.string().required(),
      bloodGroup: Joi.string().valid(...BloodGroup).required(),
      presentAddress: Joi.string().required(),
      permanentAddress: Joi.string().required(),
      academicDepartment: Joi.string().required(),
      profileImg: Joi.string().optional(),
    }).required(),
  }).required(),
});

// Update User Name Validation Schema
const updateUserNameValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(20).pattern(/^[A-Z]/).messages({
    'string.pattern.base': 'First Name must start with a capital letter',
  }).optional(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().optional(),
});

// Update Faculty Validation Schema
export const updateFacultyValidationSchema = Joi.object({
  body: Joi.object({
    faculty: Joi.object({
      designation: Joi.string().optional(),
      name: updateUserNameValidationSchema.optional(),
      gender: Joi.string().valid(...Gender).optional(),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().email().optional(),
      contactNo: Joi.string().optional(),
      emergencyContactNo: Joi.string().optional(),
      bloodGroup: Joi.string().valid(...BloodGroup).optional(),
      presentAddress: Joi.string().optional(),
      permanentAddress: Joi.string().optional(),
      academicDepartment: Joi.string().optional(),
      profileImg: Joi.string().optional(),
    }).optional(),
  }).required(),
});

export const studentValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
