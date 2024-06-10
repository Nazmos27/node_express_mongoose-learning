import catchAsync from "../../utils/catchAsync";
import { OfferedCourseServices } from "./OfferedCourse.service";

const createOfferedCourse = catchAsync(async(req,res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)
    res.status(200).json({
        success : true,
        message : "Offered Course Created Successfully",
        data : result
    })
})

export const OfferedCourseControllers = {
    createOfferedCourse,
}