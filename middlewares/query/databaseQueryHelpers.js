import expressAsyncHandler from "express-async-handler";
import User from "../../models/User.js";
import Genre from "../../models/Genre.js";
import CustomError from "../../helpers/error/CustomError.js";
import Role from "../../models/Role.js";
import Country from "../../models/Country.js";
import Staff from "../../models/Staff.js";
import Movie from "../../models/Movie.js";


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

export const checkCountryExists = expressAsyncHandler(async(req, res, next) => {
    
    const {countryId} = req.params;

    const isCountryExist = await Country.findOne({where: {
        id: countryId,
        isVisible: true
    }});
    
    if(!isCountryExist){
        return next(new CustomError(404, "Country was not found with that id"));
    }

    next();

});

export const checkStaffExists = expressAsyncHandler(async(req, res, next) => {

    const {staffId} = req.params;

    const isStaffExist = await Staff.findOne({where: {
        id: staffId,
        isVisible: true
    }});

    if(!isStaffExist){
        return next(new CustomError(404, "Staff was not found with that id"));
    }

    next()

});

export const checkMovieExists = expressAsyncHandler(async(req, res, next) => {

    const {movieId} = req.params;

    const isMovieExist = await Movie.findOne({where: {
        id: movieId,
        isVisible: true
    }});

    if(!isMovieExist){
        return next(new CustomError(400, "Movie was not found with that id"));
    };

    next();
    
});