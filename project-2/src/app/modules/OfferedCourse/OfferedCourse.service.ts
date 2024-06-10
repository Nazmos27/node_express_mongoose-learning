import { AcademicDepartmentModel } from './../AcademicDepartment/acaDepartment.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistrationModel } from '../SemesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.iterface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFacultyModel } from '../AcademicFaculty/acaFaculty.model';
import { AcademicDepartmentModel } from '../AcademicDepartment/acaDepartment.model';
import { CourseModel } from '../Course/course.model';
import { FacultyModel } from '../Faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(semesterRegistration)
  if(!isSemesterRegistrationExists){
    throw new AppError(httpStatus.NOT_FOUND,'Regestered Semester not found')
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists = await AcademicFacultyModel.findById(academicFaculty)
  if(!isAcademicFacultyExists){
    throw new AppError(httpStatus.NOT_FOUND,'Academic Faculty not found')
  }

  const isAcademicDepartmentExists = await AcademicDepartmentModel.findById(academicDepartment)
  if(!isAcademicDepartmentExists){
    throw new AppError(httpStatus.NOT_FOUND,'Academic Department not found')
  }

  const isCourseExists = await CourseModel.findById(course)
  if(!isCourseExists){
    throw new AppError(httpStatus.NOT_FOUND,'Course not found')
  }

  const isFacultyExists = await FacultyModel.findById(faculty)
  if(!isFacultyExists){
    throw new AppError(httpStatus.NOT_FOUND,'Faculty not found')
  }



  const result = await OfferedCourseModel.create({...payload,academicSemester});
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
