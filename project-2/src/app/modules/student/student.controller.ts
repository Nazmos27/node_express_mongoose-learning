import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentDB();
  /* res.status(200).json({
       success: true,
       message: 'Student are retrieved successfully',
       data: result,
     });*/
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data has retrieved successfully',
    data: result,
  });
  /*
    this utils is used for prior block of response code...though it was said to be used for make the code cleaner but i found no imporvement here...here u see i have to write 5/6 lines of code every time as the prior so i decided not to use it...only used here for understanding the behaviour!
    */
});

const getSingleStudentData = catchAsync(async (req, res) => {
  const result = await StudentServices.getSingleData(req.params.id);
  res.status(200).json({
    success: true,
    message: "Single Student's data has retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const studentId = req.params.id;
  const {student} = req.body;
  const result = await StudentServices.updateStudentFromDB(studentId,student);
  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.deleteStudentFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Data deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudentData,
  deleteStudent,
  updateStudent,
};
