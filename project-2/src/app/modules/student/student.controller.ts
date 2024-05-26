import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

//catchAsyc, a higher order function which will reduce repeatation of using tryCatch block
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
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

const getSingleStudentData: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await StudentServices.getSingleData(req.params.id);
    res.status(200).json({
      success: true,
      message: "Single Student's data has retrieved successfully",
      data: result,
    });
  },
);

const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentServices.deleteStudentFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Data deleted successfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudentData,
  deleteStudent,
};
