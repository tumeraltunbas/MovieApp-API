import {Router} from "express";
import {isAuth} from "../middlewares/auth/auth.js";
import { createFavorite, deleteFavorite } from "../controllers/favorite.js";
import { checkMovieExists, checkFavoriteExists } from "../middlewares/query/databaseQueryHelpers.js";


const router = Router({mergeParams: true});

router.get("/", [isAuth, checkMovieExists], createFavorite);
router.delete("/", [isAuth, checkMovieExists, checkFavoriteExists], deleteFavorite);


export default router; 