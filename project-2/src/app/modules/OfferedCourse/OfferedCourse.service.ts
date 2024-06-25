import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistrationModel } from '../SemesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.iterface';
import { OfferedCourseModel } from './OfferedCourse.model';
import { AcademicFacultyModel } from '../AcademicFaculty/acaFaculty.model';
import { AcademicDepartmentModel } from '../AcademicDepartment/acaDepartment.model';
import { CourseModel } from '../Course/course.model';
import { FacultyModel } from '../Faculty/faculty.model';
import hasTimeConflict from './OfferedCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Regestered Semester not found');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }

  const isCourseExists = await CourseModel.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const isFacultyExists = await FacultyModel.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  //check if the department belong to the faculty

  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belong to the ${isAcademicFacultyExists.name}`,
    );
  }

  //check if the same offered course same section in same regestered semester exists

  const isSameCourseSameSectionInSameSemester =
    await OfferedCourseModel.findOne({ semesterRegistration, course, section });

  if (isSameCourseSameSectionInSameSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Offered Course with same section already exist`,
    );
  }

  //get the schedule of the faculties
  const assignedSchedules = await OfferedCourseModel.find({semesterRegistration,faculty,days: {$in : days}}).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime
  }

  if(hasTimeConflict(assignedSchedules,newSchedule)){
    throw new AppError(httpStatus.CONFLICT,'This faculty is not available at that time! Choose other day or time!')
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
