import { DataTypes } from "sequelize";
import {sequelize} from "../helpers/database/database.js";

const Movie = sequelize.define("Movie", {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseDate: {
        type: DataTypes.DATEONLY
    },
    duration: {
        type: DataTypes.TIME
    },
    moviePoster: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.NUMBER
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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