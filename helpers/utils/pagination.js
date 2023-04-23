import expressAsyncHandler from "express-async-handler";

export const paginationHelper = expressAsyncHandler(async(req, model) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await model.count();

    const pagination = {};

    if(startIndex > 0){

        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }

    if(endIndex < total){

        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    return {startIndex, limit, pagination};

});