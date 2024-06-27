import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const getStudentDB = async (query: Record<string, unknown>) => {
  const studentSearchablaFields = ['email', 'name.firstName', 'presentAddress'];
  /* const queryObj = { ...query }; //copying query for make changes on it without muting it

    const excludedFields = ['searchTerm', 'sort', 'limit','page','fields'];
    excludedFields.forEach((ele) => delete queryObj[ele]);

    let searchTerm = '';
    if (query?.searchTerm) {
      searchTerm = query?.searchTerm as string;
    }

    const searchQuery = StudentModel.find({
      $or: studentSearchablaFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });

    const filterQuery = searchQuery
      .find(queryObj)
      .populate('admissionSemester')
      .populate({ path: 'academicDepartment', populate: 'academicFaculty' });

    let sort = 'createdAt';
    if (query?.sort) {
      sort = query?.sort as string;
    }

    const sortedQuery = filterQuery.sort(sort);

    let limit = 1;
    let page = 1;
    let skip = 0;

    if (query?.limit) {
      limit = Number(query?.limit);
    }
    if(query?.page){
      page = Number(query?.page)
      skip = (page-1) * limit;
    }

    const paginateQuery = sortedQuery.skip(skip)

    const limitedQuery = paginateQuery.limit(limit);

    //fields limiting

    let fields = '-__v'

    if(query?.fields){
      fields = (query?.fields as string).split(',').join(' ')
    }

    const fieldQuery = await limitedQuery.select(fields)

    return fieldQuery; */

  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({ path: 'academicDepartment', populate: 'academicFaculty' }),
    query,
  )
    .search(studentSearchablaFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleData = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  // const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateStudentFromDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await StudentModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.NOT_MODIFIED, 'Failed to delete student');
    }
    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.NOT_MODIFIED, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete');
  }
};

export const StudentServices = {
  getStudentDB,
  getSingleData,
  deleteStudentFromDB,
  updateStudentFromDB,
};
