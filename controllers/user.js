import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Favorite from "../models/Favorite.js";
import Movie from "../models/Movie.js";

export const getProfile = expressAsyncHandler(async(req, res, next) => {
    
    const user = await User.findByPk(req.user.id, {
        attributes: ["id", "googleId", "firstName", "lastName", "email", "profileImage"]
    });

    return res
    .status(200)
    .json({
        success: true,
        user: user
    });

});

export const editUser = expressAsyncHandler(async(req, res, next) => {

    const {firstName, lastName} = req.body;

    await User.update(
        {
            firstName:firstName,
            lastName: lastName
        },
        {where: {id: req.user.id}}
    );

    return res
    .status(200)
    .json({success:true, message: "User has been updated"});
});

export const uploadProfileImage = expressAsyncHandler(async(req, res, next) => {

    if(!req.file)
    {
        return next(new CustomError(400, "You did not send a file"));
    }

    await User.update(
        {profileImage: req.filename},
        {id: req.user.id}
    );

    return res
    .status(200)
    .json({
        success:true, 
        message:"Profile Image has been uploaded"
    });

});

export const deleteProfileImage = expressAsyncHandler(async(req, res, next) => {

    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });

    user.profileImage = "default_pp.jpg";

    await user.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Profile image has been deleted"
    });

});

export const getFavorites = expressAsyncHandler(async(req, res, next) => {

    const favorites = await Favorite.findAll({
        where: {
            UserId: req.user.id
        },
        include: {
            model: Movie,
            attributes: ["title", "moviePoster", "rating", "duration", "description", "releaseDate"]
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