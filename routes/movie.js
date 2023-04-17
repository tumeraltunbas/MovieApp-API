import {Router} from "express";
import { getAdminAccess, isAuth } from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createMovie, editMovie } from "../controllers/movie.js";
import {checkMovieExists} from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createMovie);
router.put("/:movieId", [isAuth, getAdminAccess, checkMovieExists, upload.single("file")], editMovie);

export default router;