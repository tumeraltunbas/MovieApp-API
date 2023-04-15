import expressAsyncHandler from "express-async-handler";
import User from "../../models/User.js";
import Genre from "../../models/Genre.js";
import CustomError from "../../helpers/error/CustomError.js";
import Role from "../../models/Role.js";


export const checkUserExists = expressAsyncHandler(async(req, res, next) => {
    
    const {email} = req.body;

    const user = await User.findOne({where: {
        email :email
    }});

    if(!user) {
        return next(new CustomError(404, "User was not found with that email"));
    }

    next();
});

export const checkGenreExists = expressAsyncHandler(async(req, res, next) => {

    const {genreId} = req.params;

    const isGenreExists = await Genre.findOne({where: {
        id: genreId,
        isVisible: true
    }});

    if(!isGenreExists){
        return next(new CustomError(404, "Genre was not found with that id"));
    }

    next();

});

export const checkRoleExists = expressAsyncHandler(async(req, res, next) => {

    const {roleId} = req.params;

    const isRoleExists = await Role.findOne({where: {
        id: roleId,
        isVisible: true
    }});

    if(!isRoleExists){
        return next(new CustomError(404, "Role was not found with that id"));
    }

    next();

});