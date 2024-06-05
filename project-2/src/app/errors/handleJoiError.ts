import Joi from "joi";
import { TErrorSources } from "../global-interfaces/errorSource.interface";

const handleJoiError = (error : Joi.ValidationError) => {
    const errorSources : TErrorSources = error.details.map((detail) => ({
      path: detail?.path[detail.path.length-1],
      message: detail.message,
    }));
    const statusCode = 400
    return {
      statusCode,
      message : "Validation error",
      errorSources
      
    }
  }

export default handleJoiError