import Joi from 'joi';
// Define the Joi schema based on your Mongoose schema
const userValidationSchema = Joi.object({
  password: Joi.string()
    .optional()
    .max(20, 'password should be less than 20 characters')
    .messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be an empty field',
      'any.required': 'Password is a required field',
    }),

});

export default userValidationSchema;
