import {Router} from "express";
import { createCountry, deleteCountry, editCountry, getAllCountries } from "../controllers/country.js";
import { getAdminAccess, isAuth } from "../middlewares/auth/auth.js";
import { checkCountryExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess], createCountry);
router.put("/:countryId", [isAuth, getAdminAccess, checkCountryExists], editCountry);
router.put("/:countryId/delete", [isAuth, getAdminAccess, checkCountryExists], deleteCountry);

router.get("/", getAllCountries);

export default router;