import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
} from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.get('/', OfferedCourseControllers.getAllOfferedCourses);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.patch(
  '/:id',
  validateRequest(updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
