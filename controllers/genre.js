import expressAsyncHandler from "express-async-handler";
import Genre from "../models/Genre.js";
import CustomError from "../helpers/error/CustomError.js";
import { capitalize } from "../helpers/input/inputHelpers.js";

export const createGenre = expressAsyncHandler(async(req, res, next) => {

    const {genreName} = req.body;

    const isGenreExists = await Genre.findOne({where: {
        name: genreName
    }});

    if(isGenreExists){
        return next(new CustomError(400, "This genre already exists in database"));
    }

    const newGenre = await Genre.create({
        name: capitalize(genreName),
        admin_id: req.user.id
    });

    return res
    .status(201)
    .json({
        success: true, 
        message: `${newGenre.name} Genre has been created`
    });

});


export const editGenre = expressAsyncHandler(async(req, res, next) => {

    const {genreId} = req.params;
    const {genreName} = req.body;

    const genre = await Genre.findOne({where: {
        id: genreId
    }});

    genre.name = capitalize(genreName);
    await genre.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Genre has been updated"
    });

});