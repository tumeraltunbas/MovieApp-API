import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getProfile = expressAsyncHandler(async(req, res, next) => {
    
    const user = await User.findOne({
        id: req.user.id
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