import Joi from "joi";

// Define the Joi validation schema
export const createAcademicFacultyValidationSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name is required',
            'any.required': 'Name is required',
        }),
});
export const updateAcademicFacultyValidationSchema = Joi.object({
    name: Joi.string()
        .optional()
        .messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name is required',
            'any.required': 'Name is required',
        }),
});

