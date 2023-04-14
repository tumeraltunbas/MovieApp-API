import { DataTypes } from "sequelize";
import {sequelize} from "../helpers/database/database.js";

const Movie = sequelize.define("Movie", {

    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    releaseDate: {
        type: DataTypes.DATEONLY
    },
    duration: {
        type: DataTypes.TIME
    },
    moviePoster: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.NUMBER
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});


await Movie.sync();
export default Movie;