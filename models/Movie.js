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
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: true
    },
    moviePoster: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    UserId: {
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
    },
});


await Movie.sync();
export default Movie;