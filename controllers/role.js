import expressAsyncHandler from "express-async-handler";
import Role from "../models/Role.js";
import CustomError from "../helpers/error/CustomError.js";
import { capitalize } from "../helpers/input/inputHelpers.js";

export const createRole = expressAsyncHandler(async(req, res, next) => {
    
    const {roleName} = req.body;

    const isRoleExists = await Role.findOne({where: {
        name: roleName.trim()
    }});

    if(isRoleExists){
        return next(new CustomError(400, "This role is already exists in database"));
    }

    await Role.create({
        name: capitalize(roleName.trim()),
        admin_id: req.user.id
    });

    return res
    .status(200)
    .json({
        success: true, 
        message: "Role has been created"
    });

});