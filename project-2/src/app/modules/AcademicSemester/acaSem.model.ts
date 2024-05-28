import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonth } from './acaSem.interface';

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

export const semesterNameEnum = ['Autumn', 'Summer', 'Fall'] as const;
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

export const AcademicSemesterModel = model<TAcademicSemester>(
  'semester-info',
  academicSemesterSchema,
);
