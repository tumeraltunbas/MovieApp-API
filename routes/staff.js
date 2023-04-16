import {Router} from "express";
import {isAuth, getAdminAccess} from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createStaff, editStaff } from "../controllers/staff.js";
import { checkStaffExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createStaff);
router.put("/:staffId", [isAuth, getAdminAccess, checkStaffExists, upload.single("file")], editStaff);


export default router;