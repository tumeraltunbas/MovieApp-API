import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";

const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING
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


await Role.sync();
export default Role;