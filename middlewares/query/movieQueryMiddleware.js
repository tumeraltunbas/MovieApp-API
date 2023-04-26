import expressAsyncHandler from "express-async-handler";
import { movieSearchHelper, movieSortHelper } from "./queryMiddlewareHelpers.js";
import Movie from "../../models/Movie.js";
import { paginationHelper } from "../../helpers/utils/pagination.js";

const movieQueryMiddleware = expressAsyncHandler(async(req, res, next) => {

    const {sortBy, value} = movieSortHelper(req);
    const where = movieSearchHelper(req);
    const {startIndex, limit, pagination} = await paginationHelper(req, Movie);

    req.movieQuery = {
        sortBy, 
        value, 
        where, 
        startIndex, 
        limit, 
        pagination
    }

    next();

});

export default movieQueryMiddleware;