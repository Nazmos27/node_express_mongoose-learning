import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';

const getStudentDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const getSingleData = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  // const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {

  const session =await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedStudent = await StudentModel.findOneAndUpdate({ id }, { isDeleted: true },{new : true,session})
    if(!deletedStudent){
      throw new AppError(httpStatus.NOT_MODIFIED,'Failed to delete student')
    }
    const deletedUser = await UserModel.findOneAndUpdate({id},{isDeleted : true}, {new : true,session})
    if(!deletedUser){
      throw new AppError(httpStatus.NOT_MODIFIED,'Failed to delete user')
    }
    await session.commitTransaction()
    await session.endSession()

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,'Failed to delete')
  }
  
};

export const StudentServices = {
  getStudentDB,
  getSingleData,
  deleteStudentFromDB,
};
