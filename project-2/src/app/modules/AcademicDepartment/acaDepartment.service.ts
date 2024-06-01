import { TAcademicDepartment } from "./acaDepartment.interface"
import { AcademicDepartmentModel } from "./acaDepartment.model"

const createAcademicDepartmentIntoDB = async(payLoad : TAcademicDepartment) => {
    const result = await AcademicDepartmentModel.create(payLoad)
    return result
}

const getAcademicDepartmentsFromDB = async() => {
    const result = await AcademicDepartmentModel.find({})
    return result;
}

const getSingleAcademicDepartmentFromDB = async(id: string) => {
    const result = await AcademicDepartmentModel.findOne({_id:id})
    return result;
}

const updateAcademicDepartment = async(id : string, payLoad : Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartmentModel.findOneAndUpdate({_id:id}, payLoad, {new : true})
    return result
}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentsFromDB,
    updateAcademicDepartment,
    getSingleAcademicDepartmentFromDB,
}