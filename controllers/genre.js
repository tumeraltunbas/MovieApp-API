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
