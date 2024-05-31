import express from 'express';
import { AcademicSemesterControllers } from './acaSem.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidationSchema, updateSemesterValidationSchema } from './acaSem.validation';

const router = express.Router()

router.post('/create-academic-semester',validateRequest(academicSemesterValidationSchema),AcademicSemesterControllers.createAcademicSemester)
router.patch('/:semesterId',validateRequest(updateSemesterValidationSchema),AcademicSemesterControllers.createAcademicSemester)

router.get('/',AcademicSemesterControllers.getAcademicSemesterInfo)
router.get('/:id',AcademicSemesterControllers.getSingleSemesterInfo)


export const AcademicSemesterRoutes = router