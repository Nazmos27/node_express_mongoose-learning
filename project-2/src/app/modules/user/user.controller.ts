import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  //send response
  return res.status(200).json({
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
};
