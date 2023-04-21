import {Router} from "express";
import {isAuth} from "../middlewares/auth/auth.js";
import { createFavorite } from "../controllers/favorite.js";
import { checkMovieExists } from "../middlewares/query/databaseQueryHelpers.js";


const router = Router({mergeParams: true});

router.get("/", [isAuth, checkMovieExists], createFavorite);


export default router; 