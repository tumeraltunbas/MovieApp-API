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
    country_id: {
        type: DataTypes.INTEGER
    },
    role_id: {
        type: DataTypes.INTEGER,
    },
    admin_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
    }
});

await Staff.sync();
export default Staff;