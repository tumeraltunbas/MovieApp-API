import {Router} from "express";
import {getAdminAccess, isAuth} from "../middlewares/auth/auth.js";
import { createGenre} from "../controllers/genre.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess], createGenre);

export default router;