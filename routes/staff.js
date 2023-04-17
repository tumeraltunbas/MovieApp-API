import {Router} from "express";
import {isAuth, getAdminAccess} from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createStaff, editStaff, deleteStaff, getAllStaffs, getStaffById, getAllActors } from "../controllers/staff.js";
import { checkStaffExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createStaff);
router.put("/:staffId", [isAuth, getAdminAccess, checkStaffExists, upload.single("file")], editStaff);
router.put("/:staffId/delete", [isAuth, getAdminAccess, checkStaffExists], deleteStaff);

router.get("/", getAllStaffs);
router.get("/actors", getAllActors);
router.get("/:staffId", checkStaffExists, getStaffById);

export default router;