import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID cannot be an empty field',
    'any.required': 'ID is a required field',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password should be a type of text',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field',
  }),
});

export const changePassValidationSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.base': 'Password should be a type of text',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field',
  }),
  newPassword: Joi.string().required().messages({
    'string.base': 'Password should be a type of text',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field',
  }),
});

export const refreshTokenValidationSchema = Joi.object({
  cookies: Joi.object({
    refreshToken: Joi.string().required().messages({
      'string.empty': 'Refresh token cannot be an empty field',
      'any.required': 'Refresh token is a required field',
    }),
  }),
});

export const forgetPasswordValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID cannot be an empty field',
    'any.required': 'ID is a required field',
  }),
});

export const resetPasswordValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID cannot be an empty field',
    'any.required': 'ID is a required field',
  }),
  newPassword: Joi.string().required().messages({
    'string.base': 'Password should be a type of text',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field',
  }),
});
