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
    .status(201)
    .json({
        success: true, 
        message: "Role has been created"
    });

});

export const editRole = expressAsyncHandler(async(req, res, next) => {
    
    const {roleId} = req.params;
    const {roleName} = req.body;

    const isRoleExist = await Role.findOne({
        name: roleName.trim(),
        isVisible: true
    });

    if(isRoleExist){
        return next(new CustomError(400, "This role name is already exists"));
    }

    const role = await Role.findOne({where: {
        id: roleId,
        isVisible: true
    }});

    role.name = capitalize(isRoleExist.trim());
    await role.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Role has been edited"
    })

});