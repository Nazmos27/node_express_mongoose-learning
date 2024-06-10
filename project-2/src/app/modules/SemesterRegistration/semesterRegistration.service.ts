import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../AcademicSemester/acaSem.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payLoad: TSemesterRegistration,
) => {

    const academicSemester = payLoad?.academicSemester;


    //check if the semester exist
  const isAcademicSemester =
  await AcademicSemesterModel.findById(academicSemester);
if (!isAcademicSemester) {
  throw new AppError(
    httpStatus.NOT_FOUND,
    'This Academic Semester not found',
  );
}

  //checking if the semester already registered
  const isSemesterRegistrtionExists = await SemesterRegistrationModel.findOne({academicSemester : academicSemester})

  if(isSemesterRegistrtionExists){
    throw new AppError(httpStatus.CONFLICT,'This semester already registered!')
  }

  const result = await SemesterRegistrationModel.create(payLoad)
  return result;
  
  
};

const getAllSemesterRegistrationsFromDB = async (query : Record<string, unknown>) => {
    const semesterRegistrationQuery =new QueryBuilder(SemesterRegistrationModel.find().populate('academicSemester'),query).fields().paginate().filter().sort()

    const result = await semesterRegistrationQuery.modelQuery;
    return result
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await SemesterRegistrationModel.findById(id)
    return result;
};

const updateSemesterRegistrationIntoDB = async (id: string) => {};

export const SemesterRegistationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
