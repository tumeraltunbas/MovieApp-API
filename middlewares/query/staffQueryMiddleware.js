import expressAsyncHandler from "express-async-handler";
import Staff from "../../models/Staff.js";
import {staffSearchHelper, staffSortHelper} from "./queryMiddlewareHelpers.js";
import { paginationHelper } from "../../helpers/utils/pagination.js";

const staffQueryMiddleware = expressAsyncHandler(async(req, res, next) => {

    const {sortBy, value} = staffSortHelper(req);
    const where = staffSearchHelper(req);
    const {startIndex, limit, pagination} = await paginationHelper(req, Staff);

    req.staffQuery = {
        sortBy,
        value,
        where,
        startIndex,
        limit,
        pagination
    };

    next();

});

export default staffQueryMiddleware;