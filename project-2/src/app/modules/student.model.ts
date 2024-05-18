import {
  Gurdian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';
import { Schema, model } from 'mongoose';

//making sub-schema to minimize the messyness and to maintain clean codebase

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
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
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'B+', 'B-'],
  presentAdress: { type: String, required: true },
  permanentAdress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

/*
                                    ---------------------- 
                                         creating model 
                                    ----------------------
what is model in mongoose?
---> In Mongoose, a model is a constructor that you can use to create instances of your documents. It's built from a schema, which defines the structure of the documents within a collection. In TypeScript, you can define a model using the Model interface from Mongoose.
*/

export const StudentModel = model<Student>('Student', studentSchema);
