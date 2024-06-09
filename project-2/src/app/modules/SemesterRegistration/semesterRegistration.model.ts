import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({})

export const SemesterRegistrationModel = model<TSemesterRegistration>('SemesterRegistration',semesterRegistrationSchema)