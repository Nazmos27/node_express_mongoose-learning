import Joi from 'joi';
// Define the Joi schema based on your Mongoose schema
export const userValidationSchema = Joi.object({
  password: Joi.string().optional().max(20).messages({
    'string.base': 'Password should be a type of text',
    'string.empty': 'Password cannot be an empty field',
    'string.max': 'Password should be less than 20 characters',
    'any.required': 'Password is a required field',
  }),
});

export const statusValidationSchema = Joi.object({
  status: Joi.string().valid('in-progress', 'blocked').required().messages({
    'any.only': 'Status must be either "in-progress" or "blocked"',
    'any.required': 'Status value is required',
  }),
});
