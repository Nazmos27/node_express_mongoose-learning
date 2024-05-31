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

const getAcademicSemesterInfo = catchAsync(async(req,res) => {
    const result = await AcademicSemesterServices.getAcademicSemesterInfoFromDB()
    res.status(200).json({
        success: true,
        message: 'Semester Info Fetched Successfully',
        data : result
    })
})

const getSingleSemesterInfo = catchAsync(async(req,res) => {
    const result = await AcademicSemesterServices.getSingleSemesterInfoFromDB(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Semester Info Fetched Successfully',
        data : result
    })
})

const putSemesterInfo = catchAsync(async(req,res) => {
    const result = await AcademicSemesterServices.updateSemesterInfo(req.params.semesterId,req.body)
    res.status(200).json({
        success: true,
        message: 'Semester Info Updated Successfully',
        data : result
    })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesterInfo,
  getSingleSemesterInfo,
  putSemesterInfo,
};
