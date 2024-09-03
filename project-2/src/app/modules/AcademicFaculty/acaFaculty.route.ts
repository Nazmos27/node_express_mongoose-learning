import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
} from './acaFaculty.validation';
import { AcademicFacultyControllers } from './acaFaculty.controller';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.postAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAcademicFaculties);

router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);

router.put(
  '/:id',
  validateRequest(updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.putAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
