import { DataTypes } from "sequelize";
import {sequelize} from "../helpers/database/database.js";

const Review = sequelize.define("Review", {

    content: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    movie_id: {
        type: DataTypes.INTEGER
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
    },
});

await Review.sync();
export default Review;