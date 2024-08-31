import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(20).trim().required(),
  middleName: Joi.string().allow('', null),
  lastName: Joi.string()
    .min(1)
    .max(20)
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/, 'only alphabetic characters')
    .messages({
      'string.pattern.name': '{#label} should be character only',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const createStudentValidationSchema = Joi.object({
  password: Joi.string().optional(),
  student: Joi.object({
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid(
      'A+',
      'A-',
      'O+',
      'O-',
      'AB+',
      'AB-',
      'B+',
      'B-',
    ),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    // profileImg: Joi.string(),
    admissionSemester: Joi.string().required(),
    academicDepartment: Joi.string().required(),
    isDeleted: Joi.boolean(),
  }),
});

const updateUserNameValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(20).trim().optional(),
  middleName: Joi.string().allow('', null),
  lastName: Joi.string()
    .min(1)
    .max(20)
    .trim()
    .optional()
    .pattern(/^[A-Za-z]+$/, 'only alphabetic characters')
    .messages({
      'string.pattern.name': '{#label} should be character only',
    }),
});

const updateGuardianValidationSchema = Joi.object({
  fatherName: Joi.string().optional(),
  fatherOccupation: Joi.string().optional(),
  fatherContactNo: Joi.string().optional(),
  motherName: Joi.string().optional(),
  motherOccupation: Joi.string().optional(),
  motherContactNo: Joi.string().optional(),
});

const updateLocalGuardianValidationSchema = Joi.object({
  name: Joi.string().optional(),
  occupation: Joi.string().optional(),
  contactNo: Joi.string().optional(),
  address: Joi.string().optional(),
});

const updateStudentValidationSchema = Joi.object({
  student: Joi.object({
    name: updateUserNameValidationSchema.optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().optional(),
    contactNo: Joi.string().optional(),
    emergencyContactNo: Joi.string().optional(),
    bloodGroup: Joi.string().valid(
      'A+',
      'A-',
      'O+',
      'O-',
      'AB+',
      'AB-',
      'B+',
      'B-',
    ),
    presentAddress: Joi.string().optional(),
    permanentAddress: Joi.string().optional(),
    guardian: updateGuardianValidationSchema.optional(),
    localGuardian: updateLocalGuardianValidationSchema.optional(),
    profileImg: Joi.string(),
    admissionSemester: Joi.string().optional(),
    academicDepartment: Joi.string().optional(),
    isDeleted: Joi.boolean(),
  }),
});

// const= Joi.object({
//   password: Joi.string().required(),
//   student: studentValidationSchema.required(),
// });

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
