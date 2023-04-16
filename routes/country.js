import {Router} from "express";
import { createCountry } from "../controllers/country.js";

const router = Router();

router.post("/", createCountry);

export default router;