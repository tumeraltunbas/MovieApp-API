import {Router} from "express";
import { getAdminAccess, isAuth } from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createMovie, editMovie, deleteMovie, getAllMovies, getMovieById, getMoviesByGenreId, getMoviesByStaffId } from "../controllers/movie.js";
import {checkGenreExists, checkMovieExists, checkStaffExists} from "../middlewares/query/databaseQueryHelpers.js";
import reviewRoutes from "./review.js";
import favoriteRoutes from "./favorite.js";
import movieQueryMiddleware from "../middlewares/query/movieQueryMiddleware.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createMovie);
router.put("/:movieId", [isAuth, getAdminAccess, checkMovieExists, upload.single("file")], editMovie);
router.put("/:movieId/delete", [isAuth, getAdminAccess, checkMovieExists], deleteMovie);

router.get("/", movieQueryMiddleware, getAllMovies);
router.get("/:movieId", checkMovieExists, getMovieById);
router.get("/genre/:genreId", [checkGenreExists, movieQueryMiddleware], getMoviesByGenreId);
router.get("/staff/:staffId", [checkStaffExists, movieQueryMiddleware], getMoviesByStaffId);

router.use("/:movieId/review", reviewRoutes);
router.use("/:movieId/favorite", favoriteRoutes);


export default router;