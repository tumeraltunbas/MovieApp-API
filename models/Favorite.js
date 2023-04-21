import { DataTypes } from "sequelize";
import {sequelize} from "../helpers/database/database.js";

const Favorite = sequelize.define("Favorite", {

    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

});

await Favorite.sync();
export default Favorite;