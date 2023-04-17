import {Router} from "express";
import { getAdminAccess, isAuth } from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createMovie } from "../controllers/movie.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createMovie);

export default router;