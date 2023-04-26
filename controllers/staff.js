import expressAsyncHandler from "express-async-handler";
import Staff from "../models/Staff.js";
import CustomError from "../helpers/error/CustomError.js";
import Role from "../models/Role.js";
import Country from "../models/Country.js";
import { capitalize } from "../helpers/input/inputHelpers.js";


export const createStaff = expressAsyncHandler(async(req, res, next) => {

    const {
        firstName, 
        middleName, 
        lastName, 
        gender, 
        biography, 
        dateOfBirth, 
        dateOfDeath, 
        country_id,
        role_id
    } = req.body;

    if(!req.file){
        return next(new CustomError(400, "Please provide a profile image for staff"));
    }    

    const staff = await Staff.create({
        firstName: capitalize(firstName),
        middleName: middleName || null,
        lastName: capitalize(lastName),
        gender: gender,
        image:req.file.filename,
        biography: biography,
        dateOfBirth: dateOfBirth,
        dateOfDeath: dateOfDeath || null,
        UserId: req.user.id
    });

    await staff.addRole(role_id);
    await staff.addCountry(country_id);

    return res
    .status(200)
    .json({
        success: true, 
        message: "Staff has been created"
    });

});

export const editStaff = async(req, res, next) => {
    
    const {staffId} = req.params;
    const updateInformations = req.body;

    if(req.file){
        updateInformations.image = req.file.filename;
    }

    const staff = await Staff.findOne({where: {
        id: staffId,
        isVisible: true
    }});

    await staff.update({...updateInformations});

    //to be refactored
    await staff.addRole(updateInformations.RoleId);
    await staff.addCountry(updateInformations.CountryId);

    return res
    .status(200)
    .json({
        success: true,
        message: "Staff has been updated"
    });

}

export const deleteStaff = expressAsyncHandler(async(req, res, next) => {

    const {staffId} = req.params;

    const staff = await Staff.findOne({where: {
        id: staffId,
        isVisible: true
    }});

    staff.isVisible = false;

    await staff.save();

    return res
    .status(200)
    .json({
        success: false,
        message: "Staff has been deleted"
    });

});

export const getAllStaffs = expressAsyncHandler(async(req, res, next) => {

    const {sortBy, value, where, startIndex, limit, pagination} = req.staffQuery;

    const staffs = await Staff.findAll({
        where: where,
        offset: startIndex,
        limit: limit,
        order: [[sortBy, value]],
        attributes: {
            exclude: ["createdAt", "isVisible"]
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        staffs: staffs,
        pagination: pagination
    });

});

export const getAllActors = expressAsyncHandler(async(req, res, next) => {

    const {sortBy, value, where, startIndex, limit, pagination} = req.staffQuery;

    const actors = await Staff.findAll({
        where: where,
        include: {
            model: Role,
            where: { name: "Actor" },
            attributes: ["name"]
        },
        offset: startIndex,
        limit: limit,
        order: [[sortBy, value]],
        attributes: {
            exclude: ["createdAt", "updatedAt", "isVisible"]
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        actors: actors,
        pagination: pagination
    });

});

export const getAllDirectors = expressAsyncHandler(async(req, res, next) => {

    const {sortBy, value, where, startIndex, limit, pagination} = req.staffQuery;

    const directors = await Staff.findAll({
        where: where,
        include: {
            model: Role,
            where: { name: "Director" }
        },
        offset: startIndex,
        limit: limit,
        order: [[sortBy, value]],
        attributes: {
            exclude: ["createdAt", "updatedAt" ,"isVisible"]
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        directors: directors,
        pagination: pagination
    });

});

export const getStaffById = expressAsyncHandler(async(req, res, next) => {

    const {staffId} = req.params;

    const staff = await Staff.findOne({where: {
        id: staffId,
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        staff: staff
    });

});

export const getStaffsByCountryId = expressAsyncHandler(async(req, res, next) => {

    const {countryId} = req.params;

    const {sortBy, value, where, startIndex, limit, pagination} = req.staffQuery;

    const staffs = await Staff.findAll({
        where: where,
        include: {
            model: Country,
            where: { id: countryId },
            attributes: ["name"]
        },
        offset: startIndex,
        limit: limit,
        order: [[sortBy, value]],
        attributes: {
            exclude: ["createdAt", "updatedAt" ,"isVisible"]
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        staffs: staffs,
        pagination: pagination
    });

});