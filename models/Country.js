import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";

const Country = sequelize.define("Nation", {
    name: {
        type: DataTypes.STRING,
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

await Country.sync();
export default Country;