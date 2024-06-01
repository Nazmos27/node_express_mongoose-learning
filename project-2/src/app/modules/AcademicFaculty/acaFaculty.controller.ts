import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './acaFaculty.service';

const postAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();
  res.status(200).json({
    success: true,
    message: 'All academic-faculty data fetched Successfully',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
    req.params.id,
  );
  res.status(200).json({
    success: true,
    message: 'Single academic-faculty data fetched Successfully',
    data: result,
  });
});

const putAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic-faculty data updated Successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  postAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  putAcademicFaculty,
};
