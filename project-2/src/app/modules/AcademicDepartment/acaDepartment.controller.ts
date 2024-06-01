import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './acaDepartment.service';

const postAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  });
});

const getAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAcademicDepartmentsFromDB();
  res.status(200).json({
    success: true,
    message: 'Academic Departments Fetched Successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      req.params.id,
    );
  res.status(200).json({
    success: true,
    message: 'Academic Department Fetched Successfully',
    data: result,
  });
});

const putAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Department Updated Successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  postAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  putAcademicDepartment,
};
