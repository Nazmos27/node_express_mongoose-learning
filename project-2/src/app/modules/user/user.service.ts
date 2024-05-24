import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object

  const userData: Partial<TUser> = {};

  //if password not given, use default password

  // if(!password){
  //     user.password = config.default_password as string;
  // }else{
  //     user.password = password;
  // }
  //below line do the same as the above portion
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  userData.id = '203010000';

  //create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; //embedding Id
    studentData.user = newUser._id; //reference Id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
