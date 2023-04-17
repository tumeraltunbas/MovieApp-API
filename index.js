import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error/errorHandler.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./models/index.js";

dotenv.config({path: "./config/config.env"});
const app = express();

app.use(express.json()); //body-parser
app.use(cookieParser()); //cookieParser
app.use(cors());
app.use(express.static("public")),
app.use("/api", routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is up at ${process.env.PORT}`));