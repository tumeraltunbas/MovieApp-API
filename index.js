import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./helpers/database/database.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";

dotenv.config({path: "./config/config.env"});
const app = express();

app.use(express.json()); //body-parser


app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is up at ${process.env.PORT}`));