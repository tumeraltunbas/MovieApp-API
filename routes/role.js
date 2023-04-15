import {Router} from "express";
import {isAuth, getAdminAccess} from "../middlewares/auth/auth.js";
import { createRole } from "../controllers/role.js";

const router = Router();


router.post("/", [isAuth, getAdminAccess], createRole);


export default router;