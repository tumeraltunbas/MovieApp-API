import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

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

