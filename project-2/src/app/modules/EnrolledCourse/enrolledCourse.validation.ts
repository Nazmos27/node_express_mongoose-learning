import Joi from 'joi';

export const createEnrolledCourseValidationJoiSchema = Joi.object({
    offeredCourse: Joi.string().required(),
});

