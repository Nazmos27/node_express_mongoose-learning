import Joi from 'joi';

export const createEnrolledCourseValidationJoiSchema = Joi.object({
    offeredCourse: Joi.string().required(),
});

export const updateEnrolledCourseMarksValidationJoiSchema = Joi.object({
      semesterRegistration: Joi.string().required(),
      offeredCourse: Joi.string().required(),
      student: Joi.string().required(),
      courseMarks: Joi.object({
        classTest1: Joi.number().optional(),
        midTerm: Joi.number().optional(),
        classTest2: Joi.number().optional(),
        finalTerm: Joi.number().optional(),
      })
  });
