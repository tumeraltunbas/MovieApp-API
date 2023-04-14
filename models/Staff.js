import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";


const Actor = sequelize.define("Actor", {

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
    createdAt: {
        type: DataTypes.DATE
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
    }
});

await Actor.sync();
export default Actor;