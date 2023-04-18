import expressAsyncHandler from "express-async-handler";
import Staff from "../models/Staff.js";
import CustomError from "../helpers/error/CustomError.js";
import Role from "../models/Role.js";
import Country from "../models/Country.js";


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
        firstName: firstName,
        middleName: middleName || null,
        lastName: lastName,
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

    const staffs = await Staff.findAll({
        where: {
            isVisible: true
        },
        order: [
            ["firstName", "ASC"]
        ]
    });

    return res
    .status(200)
    .json({
        success: true,
        staffs: staffs
    });

});

export const getAllActors = expressAsyncHandler(async(req, res, next) => {

    const actors = await Staff.findAll({
        include: {
            model: Role,
            where: { name: "Actor" }
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        actors: actors
    });

});

export const getAllDirectors = expressAsyncHandler(async(req, res, next) => {

    const directors = await Staff.findAll({
        where: {
            isVisible: true,
        },
        include: {
            model: Role,
            where: { name: "Director" }
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        directors: directors
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

    const staffs = await Staff.findAll({
        where: {
            isVisible: true
        },
        include: {
            model: Country,
            where: { id: countryId}
        }
    });

    return res
    .status(200)
    .json({
        success: true,
        staffs: staffs
    });

});