import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudentDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleData = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {isDeleted : true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentDB,
  getSingleData,
  deleteStudentFromDB,
};
