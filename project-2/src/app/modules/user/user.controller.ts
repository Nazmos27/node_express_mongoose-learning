import { Request, Response } from "express";
import { UserServices } from "./user.service";




const createStudent = async (req: Request, res: Response) => {
    try {
      const { password, student : studentData } = req.body;
      //validation by joi
    //   const { error, value } = studentValidationSchema.validate(studentData);
  
      
  
      // console.log({error},{value});
    //   if (error) {
    //     return res.status(404).json({
    //       success: false,
    //       message: 'error occured',
    //       errorLog: error.details,
    //     });
    //   } 
      //will call service function to send this data
  
      const result = await UserServices.createStudentIntoDB(password, studentData);
  
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

export const UserControllers = {
  createStudent
}