import expressAsyncHandler from "express-async-handler";
import Role from "../models/Role.js";
import { capitalize } from "../helpers/input/inputHelpers.js";

export const createRole = expressAsyncHandler(async(req, res, next) => {
    
    const {roleName} = req.body;

    await Role.create({
        name: capitalize(roleName.trim()),
        UserId: req.user.id
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

    const role = await Role.findOne({where: {
        id: roleId,
        isVisible: true
    }});

    role.name = capitalize(roleName.trim());
    await role.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Role has been edited"
    })

});

export const deleteRole = expressAsyncHandler(async(req, res, next) => {
    
    const {roleId} = req.params;

    const role = await Role.findOne({where: {
        id: roleId,
        isVisible: true
    }});

    role.isVisible = false;
    await role.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Role has been deleted" 
    });

});

export const getAllRoles = expressAsyncHandler(async(req, res, next) => {
    
    const roles = await Role.findAll({
        where: {
        isVisible: true
        },
        order: [
            ["name", "ASC"]
        ]
    });

    return res
    .status(200)
    .json({
        success: true,
        roles: roles
    });

});


export const getRoleById = expressAsyncHandler(async(req, res, next) => {
    
    const {roleId} = req.params;

    const role = await Role.findOne({where: {
        id: roleId,
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        role: role
    });
});