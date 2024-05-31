import { TAcademicSemester, TAcademicSemesterNameCodeMapper } from "./acaSem.interface";
import { AcademicSemesterModel } from "./acaSem.model";

const createAcademicSemesterIntoDB = async(payload : TAcademicSemester) => {

    const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
        'Autumn' : '01',
        'Summar' : '02',
        'Fall' : '03'
    } 
    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error ('Invalid Semester Code')
    }

    const result = await AcademicSemesterModel.create(payload)
    return result
}

const getAcademicSemesterInfoFromDB = async() => {
    const result = await AcademicSemesterModel.find({})
    return result;
}

const getSingleSemesterInfoFromDB = async (id : string) => {
    const result = await AcademicSemesterModel.findById(id)
    return result;
}

const updateSemesterInfo = async (id : string, payLoad : Partial<TAcademicSemester>) => {

    const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
        'Autumn' : '01',
        'Summar' : '02',
        'Fall' : '03'
    } 

    if(payLoad.name && payLoad.code && academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code ){
        throw new Error('Invalid Semester Code')
    }

    const result = await AcademicSemesterModel.findOneAndUpdate({_id : id},payLoad,{new : true})
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAcademicSemesterInfoFromDB,
    getSingleSemesterInfoFromDB,
    updateSemesterInfo

}