import {Router} from "express";
import {getAdminAccess, isAuth} from "../middlewares/auth/auth.js";
import { createGenre, editGenre} from "../controllers/genre.js";
import { checkGenreExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess], createGenre);
router.put("/:genreId", [isAuth, getAdminAccess, checkGenreExists], editGenre);

export default router;