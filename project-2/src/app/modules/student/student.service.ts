import { StudentModel } from './student.model';

const getStudentDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleData = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getStudentDB,
  getSingleData,
  deleteStudentFromDB,
};
