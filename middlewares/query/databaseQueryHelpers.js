import expressAsyncHandler from "express-async-handler";
import User from "../../models/User.js";
import Genre from "../../models/Genre.js";
import CustomError from "../../helpers/error/CustomError.js";


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
        id: genreId
    }});

    if(!isGenreExists){
        return next(new CustomError(404, "Genre was not found with that id"));
    }

    next();

});