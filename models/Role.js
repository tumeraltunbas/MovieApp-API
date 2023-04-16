import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";

const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
});


await Role.sync();
export default Role;