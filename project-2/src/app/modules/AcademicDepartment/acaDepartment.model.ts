import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './acaDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFacultyModel',
  },
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academic-departments',
  academicDepartmentSchema,
);
