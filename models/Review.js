import { DataTypes } from "sequelize";
import {sequelize} from "../helpers/database/database.js";

const Review = sequelize.define("Review", {

    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
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

await Review.sync();
export default Review;