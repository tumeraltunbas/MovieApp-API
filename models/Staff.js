import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";


const Staff = sequelize.define("Staff", {

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biography: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dateOfDeath: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    UserId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

await Staff.sync();
export default Staff;