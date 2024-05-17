import { Student } from "./student.interface";
import { StuentModel } from "./student.model";


const createStudentIntoDB = async(student : Student) => {
    const result = await StuentModel.create(student)
    return result
}

export const StudentServices = {
    createStudentIntoDB,
}