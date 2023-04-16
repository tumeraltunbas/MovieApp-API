import {Router} from "express";
import { createCountry } from "../controllers/country.js";
import { getAdminAccess, isAuth } from "../middlewares/auth/auth.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess], createCountry);

export default router;