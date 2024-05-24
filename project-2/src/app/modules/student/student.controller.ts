import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const result = await StudentServices.getStudentDB();
    // res.status(200).json({
    //   success: true,
    //   message: 'Student are retrieved successfully',
    //   data: result,
    // });

    sendResponse(res,{
      statusCode : httpStatus.OK,
      success : true,
      message : 'Students data has retrieved successfully',
      data : result
    }) //this utils is used for prior block of response code...though it was said to be used for make the code cleaner but i found no imporvement here...here u see i have to write 5/6 lines of code every time as the prior so i decided not to use it...only used here for understanding the behaviour!

  } catch (error) {
    next(error)
  }
};

const getSingleStudentData = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const result = await StudentServices.getSingleData(req.params.id);
    res.status(200).json({
      success: true,
      message: "Single Student's data has retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};
const deleteStudent = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const result = await StudentServices.deleteStudentFromDB(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Data deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudentData,
  deleteStudent,
};
