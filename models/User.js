import { DATE, DataTypes } from "sequelize";
import { sequelize } from "../helpers/database/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Review from "./Review.js";

const User = sequelize.define("User", {
    googleId: {
        type: DataTypes.STRING,
        defaultValue: null   
    },
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
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            is: {
                args: /^\+[1-9]{1}[0-9]{7,11}$/ ,
                msg: "Invalid phone pattern"
            } 
        },
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
    isPhoneVerified: {
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
    phoneCode: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    phoneCodeExpires: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    twoFactorSecret: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    isTwoFactorEnabled: {
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
        defaultValue: DataTypes.NOW
    },
});

//Model methods
User.prototype.createJwt = function(){
    
    const {JWT_SECRET_KEY, JWT_EXPIRES} = process.env;
    
    const payload = {
        id: this.id,
        email: this.email
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRES});
    return token;

}

//Hooks
User.addHook("beforeSave", (user) => {
    if(user.changed("password")){

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash;
    }
});

User.addHook("beforeSave", async function(user){

    if(user.changed("isBlocked")){

        //Review updates
        await Review.update(
            {isVisible: false},
            {where: {UserId: user.id}}
        );
        
    }

}),

User.addHook("beforeSave", async function(user){

    if(user.changed("isActive")){

        if(user.isBlocked === false){
           
            await Review.update(
                {isVisible: user.isActive},
                {where: {
                    UserId: user.id
                }}
            );
        }
    }

});

await User.sync();
export default User;