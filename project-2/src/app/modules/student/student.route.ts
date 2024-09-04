import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//will call controller function

router.get('/',auth(USER_ROLE.admin, USER_ROLE.superAdmin), StudentControllers.getAllStudents);

router.get('/:id',auth(USER_ROLE.admin, USER_ROLE.superAdmin), StudentControllers.getSingleStudentData);
router.delete('/:id',auth(USER_ROLE.admin, USER_ROLE.superAdmin), StudentControllers.deleteStudent);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
