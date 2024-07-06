import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  loginValidationSchema,
  changePassValidationSchema,
} from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  validateRequest(changePassValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
