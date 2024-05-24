import { Request, Response } from 'express';
import { StudentServices } from './student.service';


const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'error occured',
      errorLog: error,
    });
  }
};

const getSingleStudentData = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getSingleData(req.params.id);
    res.status(200).json({
      success: true,
      message: "Single Student's data has retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'error occured',
      errorLog: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.deleteStudentFromDB(req.params.id);
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'error occured',
      errorLog: error,
    });
  }
};



export const StudentControllers = {
  getAllStudents,
  getSingleStudentData,
  deleteStudent
};
