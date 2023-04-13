import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";

const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Incorrect email format"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profileImage: {
        type: DataTypes.STRING,
        defaultValue: "default_pp.jpg"
    },
    emailVerificationToken: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    emailVerificationTokenExpires: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    resetPasswordTokenExpires: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    lastPasswordChangedAt: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    isRegisterCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
});

await User.sync();
export default User;