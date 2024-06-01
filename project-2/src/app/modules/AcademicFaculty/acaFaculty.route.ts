import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
} from './acaFaculty.validation';
import { AcademicFacultyControllers } from './acaFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
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
