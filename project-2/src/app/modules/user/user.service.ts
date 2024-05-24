import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TNewUser } from "./user.interface";
import { UserModel } from "./user.model";



const createStudentIntoDB = async (password : string, student: TStudent) => {


    //create a user object

    const user : TNewUser = {}

    //if password not given, use default password

    // if(!password){
    //     user.password = config.default_password as string;
    // }else{
    //     user.password = password;
    // }
    //below line do the same as the above portion
    user.password = password || (config.default_password as string)

    //set student role
    user.role = 'student'
    
    const result = await UserModel.create(user);
    return result;
  };


export const UserServices = {
    createStudentIntoDB
}