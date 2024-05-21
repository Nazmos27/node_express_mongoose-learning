import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .min(1)
      .max(20)
      .trim()
      .required()
      .custom((value, helpers) => {
        if (value.charAt(0).toUpperCase() + value.slice(1) !== value) {
          return helpers.error('any.custom', { message: 'First name must have the first letter capitalized' });;
        }
        return value;
      }),
    middleName: Joi.string().allow('', null),  // Assuming middleName can be empty or null
    lastName: Joi.string()
      .min(1)
      .max(20)
      .trim()
      .required()
      .pattern(/^[A-Za-z]+$/, 'only alphabetic characters'),
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
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required(),
    dateOfBirth: Joi.date().iso(),  // Assuming ISO date format
    email: Joi.string()
      .email()
      .required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'B+', 'B-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().uri(),  // Assuming the profile image is a URI
    isActive: Joi.string()
      .valid('active', 'blocked')
      .default('active'),
  });

export default studentValidationSchema;