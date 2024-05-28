import { TAcademicSemester } from "./acaSem.interface";
import { AcademicSemesterModel } from "./acaSem.model";

const createAcademicSemesterIntoDB = async(payload : TAcademicSemester) => {
    const result = await AcademicSemesterModel.create(payload)
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}