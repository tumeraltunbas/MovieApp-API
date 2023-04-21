import {Router} from "express";
import {isAuth} from "../middlewares/auth/auth.js";
import { createFavorite, deleteFavorite, getFavoritesByMovieId } from "../controllers/favorite.js";
import { checkMovieExists, checkFavoriteExists } from "../middlewares/query/databaseQueryHelpers.js";


const router = Router({mergeParams: true});

router.get("/create", [isAuth, checkMovieExists], createFavorite);
router.delete("/", [isAuth, checkMovieExists, checkFavoriteExists], deleteFavorite);

router.get("/", checkMovieExists, getFavoritesByMovieId);



export default router; 