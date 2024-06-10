import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOfferedCourseValidationSchema } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controller';

const router = express.Router()

router.post('/create-offered-course',validateRequest(createOfferedCourseValidationSchema),OfferedCourseControllers.createOfferedCourse)

export const OfferedCourseRoutes = router;