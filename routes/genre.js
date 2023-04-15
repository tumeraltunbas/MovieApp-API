import {Router} from "express";
import {getAdminAccess, isAuth} from "../middlewares/auth/auth.js";
import { createGenre, editGenre, deleteGenre, getAllGenres} from "../controllers/genre.js";
import { checkGenreExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess], createGenre);
router.put("/:genreId", [isAuth, getAdminAccess, checkGenreExists], editGenre);
router.put("/:genreId/delete", [isAuth, getAdminAccess, getAdminAccess], deleteGenre);

router.get("/", getAllGenres);

export default router;