import expressAsyncHandler from "express-async-handler";
import Country from "../models/Country.js";
import CustomError from "../helpers/error/CustomError.js";
import { capitalize } from "../helpers/input/inputHelpers.js";

export const createCountry = expressAsyncHandler(async(req, res, next) => {

    const {countryName} = req.body;

    const isCountryExist = await Country.findOne({where: {
        name: countryName.trim(),
        isVisible: true
    }});

    if(isCountryExist){
        return next(new CustomError(400, "This country already exists in database"));
    }

    const newCountry = await Country.create({
        name: capitalize(countryName.trim()),
        admin_id: req.user.id
    });

    return res
    .status(201)
    .json({
        success: true, 
        message: `${newCountry.name} has been created`
    });

});