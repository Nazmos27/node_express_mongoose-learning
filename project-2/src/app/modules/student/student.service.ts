import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudentDB = async() => {
    const result = await StudentModel.find();
    return result;
}

export const StudentServices = {
  createStudentIntoDB,
  getStudentDB,
};
