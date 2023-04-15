import {Router} from "express";
import {isAuth, getAdminAccess} from "../middlewares/auth/auth.js";
import { createRole, editRole } from "../controllers/role.js";
import { checkRoleExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();


router.post("/", [isAuth, getAdminAccess], createRole);
router.put("/:roleId", [isAuth, getAdminAccess, checkRoleExists], editRole);


export default router;