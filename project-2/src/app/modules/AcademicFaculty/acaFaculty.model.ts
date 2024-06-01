import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './acaFaculty.intereface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'academic-faculties',
  academicFacultySchema,
);
