import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './acaDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academic-faculties',
    },
  },
  {
    timestamps: true,
  },
);

//pre-hook middleweare to prevent duplicate-department creation
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartment = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartment) {
    throw new Error('Department already exists');
  }
  next();
});
//pre-hook middleweare to prevent update of deleted-department
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartment = await AcademicDepartmentModel.findOne(query);
  if (!isDepartment) {
    throw new Error('Department does not exists');
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academic-departments',
  academicDepartmentSchema,
);
