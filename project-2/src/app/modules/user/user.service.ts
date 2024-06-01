import { AcademicSemesterModel } from './../AcademicSemester/acaSem.model';
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../AcademicSemester/acaSem.interface';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import generateStudentID from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given , use deafult password
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'student';

//   // find academic semester info
//   const admissionSemester = await AcademicSemesterModel.findById(
//     payload.admissionSemester,
//   );

//   //using transaction rollback

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //set  generated id
//     userData.id = await generateStudentID(
//       admissionSemester as TAcademicSemester,
//     );

//     // create a user ---> transaction-01
//     const newUser = await UserModel.create([userData], { session }); //array

//     //create a student
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new User');
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     //create a new student ---> transaction - 02
//     const newStudent = await StudentModel.create([payload], { session });
//     if (!newStudent.length) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'Failed to create new Student',
//       );
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return newStudent;
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//   }
// }

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentID(
      admissionSemester as TAcademicSemester,
    );

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create afdasfa');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    console.log(err, 'error from rollback');
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
