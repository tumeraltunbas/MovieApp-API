import expressAsyncHandler from "express-async-handler";
import Country from "../models/Country.js";
import { capitalize } from "../helpers/input/inputHelpers.js";
import { paginationHelper } from "../helpers/utils/pagination.js";

export const createCountry = expressAsyncHandler(async(req, res, next) => {

    const {countryName} = req.body;

    const country = await Country.create({
        name: capitalize(countryName.trim()),
        UserId: req.user.id
    });

    return res
    .status(201)
    .json({
        success: true, 
        message: `${country.name} has been created`
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

    const {startIndex, limit, pagination} = await paginationHelper(req, Country);

    const countries = await Country.findAll({
        offset: startIndex,
        limit: limit
    });

    return res
    .status(200)
    .json({
        success: true,
        countries: countries,
        pagination: pagination
    });

});

export const getCountryById = expressAsyncHandler(async(req, res, next) => {

    const {countryId} = req.params;

    const country = await Country.findOne({where: {
        id: countryId,
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        country: country
    });

});