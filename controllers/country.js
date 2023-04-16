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

export const editCountry = expressAsyncHandler(async(req, res, next) => {
    
    const {countryId} = req.params;
    const {countryName} = req.body;

    const country = await Country.findOne({where: {
        id: countryId,
        isVisible: true
    }});

    country.name = capitalize(countryName.trim());
    await country.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Country has been updated"
    });

});

export const deleteCountry = expressAsyncHandler(async(req, res, next) => {

    const {countryId} = req.params;

    const country = await Country.findOne({where: {
        id: countryId,
        isVisible: true
    }});

    country.isVisible = false;
    await country.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Country has been deleted"
    });

});

export const getAllCountries = expressAsyncHandler(async(req, res, next) => {

    const countries = await Country.findAll({where: {
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        countries: countries
    });

});