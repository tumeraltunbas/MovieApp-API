import expressAsyncHandler from "express-async-handler";
import Movie from "../models/Movie.js";
import {capitalize} from "../helpers/input/inputHelpers.js";
import CustomError from "../helpers/error/CustomError.js";

export const createMovie = expressAsyncHandler(async(req, res, next) => {

    const {title, description, releaseDate, duration, staff_id} = req.body;

    if(!req.file){
        return next(new CustomError(400, "Please provide a poster for movie"));
    }

    const isMovieExist = await Movie.findOne({
        where: {
            title: title,
            description: description
        }
    });

    if(isMovieExist){
        return next(new CustomError(400, "This movie is already exist in database"));
    }

    const movie = await Movie.create({
        title: title.toUpperCase(),
        description: capitalize(description),
        moviePoster: req.file.filename,
        releaseDate: releaseDate || null,
        duration: duration || null,
        admin_id: req.user.id
    });

    await movie.addStaff(staff_id);

    return res
    .status(200)
    .json({
        success: true,
        message: "Movie has been created"
    });

});