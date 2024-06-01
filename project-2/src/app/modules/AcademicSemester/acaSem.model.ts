import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonth } from './acaSem.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const monthEnum: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesterNameEnum = ['Autumn', 'Summar', 'Fall'] as const;
export const semesterCodeEnum = ['01', '02', '03'] as const;

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterNameEnum,
      required: true,
    },
    code: {
      type: String,
      enum: semesterCodeEnum,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: monthEnum,
      required: true,
    },
    endMonth: {
      type: String,
      enum: monthEnum,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExixst = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExixst) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Semester already exists',
    );
  }
  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'semester-infos',
  academicSemesterSchema,
);
