import catchAsync from "../../utils/catchAsync";
import { SemesterRegistationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async(req,res) => {
    const result = await SemesterRegistationService.createSemesterRegistrationIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: "Semester Registration done successfully",
        data: result,
      });
})

const getAllSemesterRegistrations = catchAsync(async(req,res) => {
    const result = await SemesterRegistationService.getAllSemesterRegistrationsFromDB(req.query)

    res.status(200).json({
        success: true,
        message: "All Semester Registrations retrieved successfully",
        data: result,
      });
})

const getSingleSemesterRegistration = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await SemesterRegistationService.getSingleSemesterRegistrationFromDB(id)

    res.status(200).json({
        success: true,
        message: "Single Semester Registration data retrieved successfully",
        data: result,
      });
})

const updateSemesterRegistration = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await SemesterRegistationService.updateSemesterRegistrationIntoDB(id)

    res.status(200).json({
        success: true,
        message: "Semester Registration data updated successfully",
        data: result,
      });

})

export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    
}