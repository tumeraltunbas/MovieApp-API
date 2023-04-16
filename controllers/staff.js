import expressAsyncHandler from "express-async-handler";
import Staff from "../models/Staff.js";
import CustomError from "../helpers/error/CustomError.js";


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

    await Staff.create({
        firstName: firstName,
        middleName: middleName || null,
        lastName: lastName,
        gender: gender,
        image:req.file.filename,
        biography: biography,
        dateOfBirth: dateOfBirth,
        dateOfDeath: dateOfDeath || null,
        country_id: country_id,
        role_id: role_id,
        admin_id: req.user.id
    });

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