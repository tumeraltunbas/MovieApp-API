import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../../models/User.js";
import CustomError from "../../helpers/error/CustomError.js";

export const isAuth = (req, res, next) => {

    const {JWT_SECRET_KEY} = process.env;
    const token = req.cookies.jwt;

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        
        if(err){
            return next(err);
        }

        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    });
    
}

export const getAdminAccess = expressAsyncHandler(async(req, res, next) => {

    const user = await User.findOne({where : {
        id: req.user.id
    }});

    if(!user.isAdmin) {
        return next(new CustomError(403, "Only admins can access this route"));
    }

    next();
});