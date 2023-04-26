import { Op } from "sequelize";

export const movieSortHelper = (req) => {

    let {sortBy, value} = req.query;

    const values = ["ASC", "DESC"];
    const sortValues = ["rating", "releaseDate"];

    if((!value) || (!values.includes(value))){
        value = "DESC";
    }

    if(!sortBy || !sortValues.includes(sortBy)){
        sortBy = "releaseDate";
    }

    return {sortBy, value}

}


export const movieSearchHelper = (req) => {

    const {search} = req.query;
    
    let where = {
        isVisible: true
    };

    if(search){
        where.title = {[Op.like]: `%${search}%`}
    }

    return where;
}

export const staffSortHelper = (req) => {
    
    let {sortBy, value} = req.query;

    const values = ["ASC", "DESC"];
    const sortValues = ["firstName", "dateOfBirth"];

    if((!value) || (!values.includes(value))){
        value = "ASC";
    }

    if(!sortBy || !sortValues.includes(sortBy)){
        sortBy = "firstName";
    }

    return {sortBy, value}

}

export const staffSearchHelper = (req) => {

    const {search} = req.query;

    let where = {
        isVisible: true
    };

    if(search){
        where = {
            [Op.or]: [
                {firstName: {
                    [Op.like]: `%${search}%`
                }},
                {lastName: {
                    [Op.like]: `%${search}%`
                }}
            ],
            isVisible: true
        }
    }
    
    return where;

}