import config from '../../config';
import { TAcademicSemester } from '../AcademicSemester/acaSem.interface';
import { AcademicSemesterModel } from '../AcademicSemester/acaSem.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import generateStudentID from './user.utils';

// const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
//   //create a user object

//   const userData: Partial<TUser> = {};

//   //if password not given, use default password

//   // if(!password){
//   //     user.password = config.default_password as string;
//   // }else{
//   //     user.password = password;
//   // }
//   //below line do the same as the above portion
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'student';

//   const admissionSemester = await AcademicSemesterModel.findById(payLoad.admissionSemester)

//   userData.id =await generateStudentID(admissionSemester)

//   //create a user
//   const newUser = await UserModel.create(userData);

//   //create a student
//   if (Object.keys(newUser).length) {
//     payLoad.id = newUser.id; //embedding Id
//     payLoad.user = newUser._id; //reference Id

//     const newStudent = await StudentModel.create(payLoad);
//     return newStudent;
//   }
// };

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  //set  generated id
  userData.id = await generateStudentID(admissionSemester as TAcademicSemester);

  // create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
