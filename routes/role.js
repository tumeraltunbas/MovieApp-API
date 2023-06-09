import {Router} from "express";
import {isAuth, getAdminAccess} from "../middlewares/auth/auth.js";
import { createRole, editRole, deleteRole, getAllRoles, getRoleById } from "../controllers/role.js";
import { checkRoleExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();


router.post("/", [isAuth, getAdminAccess], createRole);
router.put("/:roleId", [isAuth, getAdminAccess, checkRoleExists], editRole);
router.put("/:roleId/delete", [isAuth, getAdminAccess, checkRoleExists], deleteRole);

router.get("/", getAllRoles);
router.get("/:roleId", checkRoleExists, getRoleById);

export default router;