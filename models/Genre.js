import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";

const Genre = sequelize.define("Genre", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    },
});


await Genre.sync();
export default Genre;