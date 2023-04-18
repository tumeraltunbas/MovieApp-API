import expressAsyncHandler from "express-async-handler";
import Genre from "../models/Genre.js";
import CustomError from "../helpers/error/CustomError.js";
import { capitalize } from "../helpers/input/inputHelpers.js";

export const createGenre = expressAsyncHandler(async(req, res, next) => {

    const {genreName} = req.body;

    const newGenre = await Genre.create({
        name: capitalize(genreName.trim()),
        UserId: req.user.id
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
        id: genreId,
        isVisible: true
    }});

    genre.name = capitalize(genreName.trim());
    await genre.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Genre has been updated"
    });

});

export const deleteGenre = expressAsyncHandler(async(req, res, next) => {
    
    const {genreId} = req.params;

    const genre = await Genre.findOne({where: {
        id: genreId,
        isVisible: true
    }});

    genre.isVisible = false;
    await genre.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Genre has been deleted"
    });

});

export const getAllGenres = expressAsyncHandler(async(req, res, next) => {
    
    const genres = await Genre.findAll({
        where: {
            isVisible:true
        },
        order: [
            ["name", "ASC"]
        ]
    });

    return res
    .status(200)
    .json({
        success: true,
        genres: genres
    });

});

export const getGenreById = expressAsyncHandler(async(req, res, next) => {
    
    const {genreId} = req.params;

    const genre = await Genre.findOne({where: {
        id: genreId,
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        genre: genre
    });

});