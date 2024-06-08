import Joi from 'joi';
import { BloodGroup, Gender } from './admin.constant';

// Create User Name Validation Schema
const createUserNameValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(20).required(),
  middleName: Joi.string().max(20).optional(),
  lastName: Joi.string().max(20).required(),
});

// Create Admin Validation Schema
const createAdminValidationSchema = Joi.object({
    password: Joi.string().max(20).required(),
    admin: Joi.object({
      designation: Joi.string().required(),
      name: createUserNameValidationSchema.required(),
      gender: Joi.string().valid(...Gender).required(),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().email().required(),
      contactNo: Joi.string().required(),
      emergencyContactNo: Joi.string().required(),
      bloodGroup: Joi.string().valid(...BloodGroup).required(),
      presentAddress: Joi.string().required(),
      permanentAddress: Joi.string().required(),
      profileImg: Joi.string().optional(),
    }).required(),

});

// Update User Name Validation Schema
const updateUserNameValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).optional(),
  middleName: Joi.string().min(3).max(20).optional(),
  lastName: Joi.string().min(3).max(20).optional(),
});

// Update Admin Validation Schema
const updateAdminValidationSchema = Joi.object({
    admin: Joi.object({
      name: updateUserNameValidationSchema.optional(),
      designation: Joi.string().max(30).optional(),
      gender: Joi.string().valid(...Gender).optional(),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().email().optional(),
      contactNo: Joi.string().optional(),
      emergencyContactNo: Joi.string().optional(),
      bloodGroup: Joi.string().valid(...BloodGroup).optional(),
      presentAddress: Joi.string().optional(),
      permanentAddress: Joi.string().optional(),
      profileImg: Joi.string().optional(),
    }).optional(),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
