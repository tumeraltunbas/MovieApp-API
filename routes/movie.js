import {Router} from "express";
import { getAdminAccess, isAuth } from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createMovie, editMovie, deleteMovie, getAllMovies, getMovieById, getMoviesByGenreId, getMoviesByStaffId } from "../controllers/movie.js";
import {checkGenreExists, checkMovieExists, checkStaffExists} from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createMovie);
router.put("/:movieId", [isAuth, getAdminAccess, checkMovieExists, upload.single("file")], editMovie);
router.put("/:movieId/delete", [isAuth, getAdminAccess, checkMovieExists], deleteMovie);

router.get("/", getAllMovies);
router.get("/:movieId", checkMovieExists, getMovieById);
router.get("/genre/:genreId", checkGenreExists, getMoviesByGenreId);
router.get("/staff/:staffId", checkStaffExists, getMoviesByStaffId);



export default router;