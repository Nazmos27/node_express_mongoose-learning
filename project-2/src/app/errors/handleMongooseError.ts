import mongoose from "mongoose";
import { TErrorSources } from "../global-interfaces/errorSource.interface";

const handleMongooseError = (err : mongoose.Error.ValidationError) => {
    const errorSources : TErrorSources = Object.values(err.errors).map((value : mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path : value?.path,
            message : value?.message
        }
    })
    const statusCode = 400
    return {
        statusCode,
        message : 'validation error',
        errorSources
    }
}

export default handleMongooseError;