import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistChecker(payload.id);
  //check if the user exist using static method
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  //checking if the password is correct using static method
  if (
    !(await UserModel.isPasswordMatchedChecker(
      payload?.password,
      user?.password,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  //checking if the user is already deleted
  if (await UserModel.isUserDeletedChecker(user)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
  }
  //checking if the user is already blocked
  if (await UserModel.isUserStatusChecker(user)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is X Blocked! X');
  }

  //generate access token

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };

  /*
  //check if the user exist
  const isUserExist = await UserModel.findOne({ id: payload.id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  //checking if the user is already deleted
  const isDeleted = isUserExist?.isDeleted
  if(isDeleted){
    throw new AppError(httpStatus.NOT_FOUND,'This user was deleted so not found')
  }
  //checking if the user is blocked
  const isBlocked = isUserExist?.status === 'blocked'
  if(isBlocked){
    throw new AppError(httpStatus.NOT_FOUND,'This user is blocked')
  }

  //checking if the password is correct
  const isPasswordMatched =await bcrypt.compare(payload?.password, isUserExist?.password)
  if(isPasswordMatched){
    throw new AppError(httpStatus.BAD_REQUEST,'The password does not match correctly')
  }
    */
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await UserModel.isUserExistChecker(userData.userId);
  //check if the user exist using static method
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  //checking if the user is already deleted
  if (await UserModel.isUserDeletedChecker(user)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
  }
  //checking if the user is already blocked
  if (await UserModel.isUserStatusChecker(user)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is X Blocked! X');
  }

  //checking if the password is correct using static method
  if (
    !(await UserModel.isPasswordMatchedChecker(
      payload.oldPassword,
      user?.password,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Old Password does not match');
  }

  //hash the password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
