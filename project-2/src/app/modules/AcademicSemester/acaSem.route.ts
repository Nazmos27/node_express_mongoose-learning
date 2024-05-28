import express from 'express';
import { AcademicSemesterControllers } from './acaSem.controller';
import validateRequest from '../../middlewares/validateRequest';
import academicSemesterValidationSchema from './acaSem.validation';

const router = express.Router()

router.post('/create-academic-semester',validateRequest(academicSemesterValidationSchema),AcademicSemesterControllers.createAcademicSemester)

export const AcademicSemesterRoutes = router