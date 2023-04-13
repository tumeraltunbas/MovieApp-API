import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: "./config/config.env"});

const {
    DB_HOST, 
    DB_PORT, 
    DB_USERNAME, 
    DB_PASSWORD, 
    DB_DIALECT, 
    DB_NAME
} = process.env;

export const sequelize = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    database: DB_NAME
});

try {
   await sequelize.authenticate();
   console.log("Database connection successfull");
}
catch(err){
    console.log(err);
}