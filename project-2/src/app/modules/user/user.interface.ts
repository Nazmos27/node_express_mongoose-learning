/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface UserModelInterface extends Model<TUser>{
  // myStaticMethod() : number
  isUserExistChecker(id: string) : Promise<TUser>   
  isPasswordMatchedChecker(plaintextPassword : string, hashedPassword : string) : Promise<boolean>
  isUserDeletedChecker(userData : TUser) : Promise<boolean>
  isUserStatusChecker(userData : TUser) : Promise<boolean>
}
