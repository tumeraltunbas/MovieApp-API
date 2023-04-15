import expressAsyncHandler from "express-async-handler";
import User from "../../models/User.js";


export const checkUserExists = expressAsyncHandler(async(req, res, next) => {
    
    const {email} = req.body;

    const user = await User.findOne({where: {
        email :email
    }});

    if(!user) {
        return next(new CustomError(404, "User was not found with that email"));
    }

    next();
});