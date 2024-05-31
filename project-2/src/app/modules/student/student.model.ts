import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

//making sub-schema to minimize the messyness and to maintain clean codebase

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [1, 'First name must be at least 1 characters long'],
    maxlength: [20, 'First name must be at most 20 characters long'],
    trim: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

/*
                            ---------------------------------------------
                                    creating schema for the student
                            ---------------------------------------------
what is schema?
---> A schema in TypeScript is a way to define the structure of data in your application. It is used to define the shape of objects, including their properties and types. In the context of Mongoose, a schema is used to define the structure of documents that will be stored in a MongoDB database.

Benefits of using schema:
1. Data Structure Enforcement: Schemas ensure that data is stored in a consistent and predictable format. This makes it easier to work with the data and helps prevent errors caused by unexpected data types or structures.

2. Data Validation: Schemas can include validation rules that ensure data meets certain criteria before it is saved to the database. This can help maintain data integrity and prevent the storage of invalid or incorrect data.

3. Improved Query Performance: Schemas can help improve query performance by allowing MongoDB to optimize queries based on the structure of the data. This can lead to faster query times and a more responsive application.

4. Code Organization and Readability: Schemas can help organize and structure your code, making it easier to read and understand. This can be especially helpful when working with large, complex applications.

5. Type Safety: When using TypeScript with Mongoose, schemas provide type safety, which can help catch errors at compile time rather than at runtime. This can lead to more robust and reliable code.

6. Autocompletion and Type Checking: With TypeScript, schemas provide autocompletion and type checking, which can help speed up development and reduce errors.

7. Data Migration: Schemas can make data migration easier by providing a clear definition of the data structure. This can help ensure that data is migrated correctly and that any changes to the data structure are properly accounted for.

8. Documentation: Schemas can serve as documentation for the structure of your data, making it easier for other developers to understand how your application works and how to work with the data.



*/

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'userId must be provided'],
      unique: true,
      ref: 'UserModel',
    },
    name: {
      type: userNameSchema,
      required: [true, "Student's name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not supported! The gender field can be only 'male', 'female', or 'other'",
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'B+', 'B-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required'],
    },
    profileImg: {
      type: String,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemesterModel',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtuals
//viruals works for showing a variable or data in client side or in response but does not save it in database...as example the code below show fullName: in response constructed with user name info but in database there will not save any field named fullName
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//middleware

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

/*
                                    ---------------------- 
                                         creating model 
                                    ----------------------
what is model in mongoose?
---> In Mongoose, a model is a constructor that you can use to create instances of your documents. It's built from a schema, which defines the structure of the documents within a collection. In TypeScript, you can define a model using the Model interface from Mongoose.
*/

export const StudentModel = model<TStudent>('Student', studentSchema);
