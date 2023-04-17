import expressAsyncHandler from "express-async-handler";
import Movie from "../models/Movie.js";
import {capitalize} from "../helpers/input/inputHelpers.js";
import CustomError from "../helpers/error/CustomError.js";
import Genre from "../models/Genre.js";

export const createMovie = expressAsyncHandler(async(req, res, next) => {

    const {title, description, releaseDate, duration, staff_id, genre_id} = req.body;

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
    await movie.addGenre(genre_id);

    return res
    .status(200)
    .json({
        success: true,
        message: "Movie has been created"
    });

});

export const editMovie = expressAsyncHandler(async(req, res, next) => {

    const updateInformations = req.body;
    const {movieId} = req.params;

    if(req.file){
        updateInformations.file = req.file.filename;
    }

    const movie = await Movie.findOne({where: {
        id: movieId,
        isVisible: true
    }});

    await movie.update({...updateInformations});

    return res
    .status(200)
    .json({
        success: true,
        message: "Movie has been updated"
    });

});

export const deleteMovie = expressAsyncHandler(async(req, res, next) => {

    const {movieId} = req.params;

    const movie = await Movie.findOne({where: {
        id: movieId,
        isVisible: true
    }});

    movie.isVisible = false;
    await movie.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Movie has been deleted"
    });
    
});

export const getAllMovies = expressAsyncHandler(async(req, res, next) => {

    const movies = await Movie.findAll({where: {
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        movies: movies
    });

});

export const getMovieById = expressAsyncHandler(async(req, res, next) => {

    const {movieId} = req.params;

    const movie = await Movie.findOne({where: {
        id: movieId,
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        movie: movie
    });

});

export const getMoviesByGenreId = expressAsyncHandler(async(req, res, next) => {

    const {genreId} = req.params;

    const movies = await Movie.findAll({
        where: {
            isVisible: true
        },
        include: {
            model: Genre,
            where: { id: genreId }
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        movies: movies
    });

});