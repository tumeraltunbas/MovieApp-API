import expressAsyncHandler from "express-async-handler";
import Favorite from "../models/Favorite.js";
import Movie from "../models/Movie.js";
import CustomError from "../helpers/error/CustomError.js";
import User from "../models/User.js";

export const createFavorite = expressAsyncHandler(async(req, res, next) => {

    const {movieId} = req.params;

    const favorite = await Favorite.findOne({
        where: {
            MovieId: movieId,
            UserId: req.user.id 
        }
    });

    if(favorite){
        return next(new CustomError(400, "You already added this movie to your favorites"));
    }

    await Favorite.create({
        MovieId: movieId,
        UserId: req.user.id
    });

    return res
    .status(201)
    .json({
        success: true,
        message: "Favorite has been created"
    });

});

export const deleteFavorite = expressAsyncHandler(async(req, res, next) => {

    const {movieId} = req.params;

    const favorite = await Favorite.findOne({
        where: {
            MovieId: movieId,
            UserId: req.user.id
        }
    });

    await favorite.destroy();

    return res
    .status(200)
    .json({
        success: true,
        message: "Favorite has been deleted"
    });

});

export const getFavoritesByMovieId = expressAsyncHandler(async(req, res, next) => {

    const {movieId} = req.params;

    const favorites = await Favorite.findAll({
        where: {
            MovieId: movieId 
        },
        include: {
            model: User,
            attributes: ["id", "firstName", "lastName"]
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        favorites: favorites,
        favoriteCount: favorites.length
    });

});