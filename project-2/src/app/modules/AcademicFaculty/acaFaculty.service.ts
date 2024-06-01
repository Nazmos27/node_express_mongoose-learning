import { TAcademicFaculty } from './acaFaculty.intereface';
import { AcademicFacultyModel } from './acaFaculty.model';

const createAcademicFacultyIntoDB = async (payLoad: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payLoad);
  return result;
};

const getAcademicFacultiesFromDB = async () => {
  const result = await AcademicFacultyModel.find({});
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFacultyModel.findOne({ _id: id });
  return result;
};

const updateAcademicFaculty = async (
  id: string,
  payLoad: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payLoad,
    { new: true },
  );
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultiesFromDB,
  updateAcademicFaculty,
  getSingleAcademicFacultyFromDB,
};
