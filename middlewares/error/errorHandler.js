import CustomError from "../../helpers/error/CustomError.js";

export const errorHandler = (err, req, res, next) => {
    
    const error = new CustomError(err.status || 500, err.message);

    if(error.message.includes("jwt")){
        error.message = "Your token has been expired. Please log in."
    }

    return res
    .status(error.status)
    .json({
        success:false, 
        message: error.message
    });
}