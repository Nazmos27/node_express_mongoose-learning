import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './acaDepartment.validation';
import { AcademicDepartmentControllers } from './acaDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.postAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAcademicDepartments);
router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.post(
  '/:id',
  validateRequest(updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.putAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
