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