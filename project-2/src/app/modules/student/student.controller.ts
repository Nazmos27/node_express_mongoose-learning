import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //validation by joi
    const { error, value } = studentValidationSchema.validate(studentData);

    

    // console.log({error},{value});
    if (error) {
      return res.status(404).json({
        success: false,
        message: 'error occured',
        errorLog: error.details,
      });
    } 
    //will call service function to send this data

    const result = await StudentServices.createStudentIntoDB(value);

    //send response

     return res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'error occured',
      errorLog: error,
    });
  }
};




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

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudentData,
};
