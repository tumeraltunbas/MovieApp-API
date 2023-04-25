import expressAsyncHandler from "express-async-handler";
import { movieSortHelper } from "./queryMiddlewareHelpers.js";
import Movie from "../../models/Movie.js";
import { Op } from "sequelize";
import { paginationHelper } from "../../helpers/utils/pagination.js";

const movieQueryMiddleware = expressAsyncHandler(async(req, res, next) => {

    const {sortBy, value} = movieSortHelper(req);
    const {search} = req.query;
    const {startIndex, limit, pagination} = await paginationHelper(req, Movie);

    const movies = await Movie.findAll({
        where: search 
        ? {title: {[Op.like]:`%${search}%`}, isVisible: true} 
        : {isVisible: true},

        order: [[sortBy, value]],
        offset: startIndex,
        limit: limit
    });

    res.movies = {
        success: true,
        movies: movies,
        pagination: pagination
    }

    next();

});

export default movieQueryMiddleware;