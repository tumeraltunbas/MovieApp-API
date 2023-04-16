import {Router} from "express";
import { createCountry, editCountry } from "../controllers/country.js";
import { getAdminAccess, isAuth } from "../middlewares/auth/auth.js";
import { checkCountryExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess], createCountry);
router.put("/:countryId", [isAuth, getAdminAccess, checkCountryExists], editCountry);

export default router;