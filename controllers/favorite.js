import expressAsyncHandler from "express-async-handler";
import Favorite from "../models/Favorite.js";
import Movie from "../models/Movie.js";
import CustomError from "../helpers/error/CustomError.js";

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