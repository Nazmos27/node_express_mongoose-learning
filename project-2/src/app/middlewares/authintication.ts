import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRolls } from '../modules/user/user.interface';

const auth = (...requiredRolls: TUserRolls[]) => {
  return catchAsync(async (req : Request, res : Response, next : NextFunction) => {
      
    const token = req.headers.authorization;
    //check if the token is sent from the client
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED, 'Token not found');

    }

    //check if the token is valid
    jwt.verify(token, config.jwt_access_secret as string, function(err,decoded){
        if(err){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        //check if the user is in the required rolls
        const role = (decoded as JwtPayload).role
        if(requiredRolls && !requiredRolls.includes(role)){
            throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized')
        }

        req.user = decoded as JwtPayload;
        next()
    })

  
    })
};

export default auth;