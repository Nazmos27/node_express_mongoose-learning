import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './acaSem.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Semester Created Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
