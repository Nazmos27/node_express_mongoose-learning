import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import academicFacultyValidationSchema from './acaFaculty.validation';
import { AcademicFacultyControllers } from './acaFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidationSchema),
  AcademicFacultyControllers.postAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAcademicFaculties);

router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);

router.put(
  '/:id',
  validateRequest(academicFacultyValidationSchema),
  AcademicFacultyControllers.putAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
