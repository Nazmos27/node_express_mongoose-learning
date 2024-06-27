import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRolls } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';

const auth = (...requiredRolls: TUserRolls[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token not found');
    }

    //check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;
    const user = await UserModel.isUserExistChecker(userId);
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

    if (
      user.passwordChangedAt &&
      (await UserModel.isNewTokenGrantedAfterPassChangeChecker(
        user.passwordChangedAt,
        iat as number,
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    //check if the user is in the required rolls
    if (requiredRolls && !requiredRolls.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
