import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { createSemesterRegistrationValidationSchema } from './semesterRegistration.validation'
import { SemesterRegistrationController } from './semesterRegistration.controller'
const router = express.Router()

router.post('/create-semester-registration',validateRequest(createSemesterRegistrationValidationSchema),SemesterRegistrationController.createSemesterRegistration)

router.get('/',SemesterRegistrationController.getAllSemesterRegistrations)

router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id',SemesterRegistrationController.updateSemesterRegistration)

export const SemesterRegistrationRoutes = router