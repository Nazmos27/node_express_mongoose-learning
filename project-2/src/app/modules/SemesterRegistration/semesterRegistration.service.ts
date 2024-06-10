import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../AcademicSemester/acaSem.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payLoad: TSemesterRegistration,
) => {
  const academicSemester = payLoad?.academicSemester;
  //check if there any regestered semsester that is already upcoming or ongoing

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester`,
    );
  }

  //check if the semester exist
  const isAcademicSemester =
    await AcademicSemesterModel.findOne(academicSemester);
  if (!isAcademicSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester not found',
    );
  }

  //checking if the semester already registered
  const isSemesterRegistrtionExists = await SemesterRegistrationModel.findOne({
    academicSemester: academicSemester,
  });

  if (isSemesterRegistrtionExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester already registered!',
    );
  }

  const result = await SemesterRegistrationModel.create(payLoad);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .fields()
    .paginate()
    .filter()
    .sort();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payLoad: Partial<TSemesterRegistration>,
) => {

    //check if requested semester exist or not
    const isSemesterRegistrtionExists = await SemesterRegistrationModel.findById(id);
  if (!isSemesterRegistrtionExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Registered Semester not found',
    );
  }

  //if the requested semester registration ended, we will not update anything
  const requestedStatus = payLoad?.status
  const requestedSemesterStatus = isSemesterRegistrtionExists?.status
  if (requestedSemesterStatus === RegistrationStatus.ENDED) { //used readOnly objData to avoid spelling mistake.here used as example how to ensure spelling consistency 
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is Already ${requestedSemesterStatus}`,
    );
  }

  //UPCOMING --> ONGOING --> ENDED 
  if(requestedSemesterStatus === 'UPCOMING' && requestedStatus === 'ENDED'){
    throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from 'UPCOMING' to 'ENDED'`,
      ); 
  }
  if(requestedSemesterStatus === 'ONGOING' && requestedStatus === 'UPCOMING'){
    throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from 'ONGOING' to 'UPCOMING'`,
      ); 
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(id,payLoad,{new : true, runValidators : true})
  return result;
};

export const SemesterRegistationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
