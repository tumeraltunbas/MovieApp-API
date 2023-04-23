import expressAsyncHandler from "express-async-handler";
import Role from "../models/Role.js";
import { capitalize } from "../helpers/input/inputHelpers.js";
import { paginationHelper } from "../helpers/utils/pagination.js";

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
    
    const {startIndex, limit, pagination} = await paginationHelper(req, Role);

    const roles = await Role.findAll({
        where: {
        isVisible: true
        },
        order: [
            ["name", "ASC"]
        ],
        offset: startIndex,
        limit: limit
    });

    return res
    .status(200)
    .json({
        success: true,
        roles: roles,
        pagination: pagination
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