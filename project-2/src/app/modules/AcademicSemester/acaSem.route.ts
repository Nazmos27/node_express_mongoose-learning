import express from 'express';
import { AcademicSemesterControllers } from './acaSem.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  academicSemesterValidationSchema,
  updateSemesterValidationSchema,
} from './acaSem.validation';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(academicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.patch(
  '/:semesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  validateRequest(updateSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getAcademicSemesterInfo,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getSingleSemesterInfo,
);

export const AcademicSemesterRoutes = router;
