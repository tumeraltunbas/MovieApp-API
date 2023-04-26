import {Router} from "express";
import {isAuth, getAdminAccess} from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createStaff, editStaff, deleteStaff, getAllStaffs, getAllActors, getAllDirectors, getStaffById, getStaffsByCountryId } from "../controllers/staff.js";
import { checkCountryExists, checkStaffExists } from "../middlewares/query/databaseQueryHelpers.js";
import staffQueryMiddleware from "../middlewares/query/staffQueryMiddleware.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createStaff);
router.put("/:staffId", [isAuth, getAdminAccess, checkStaffExists, upload.single("file")], editStaff);
router.put("/:staffId/delete", [isAuth, getAdminAccess, checkStaffExists], deleteStaff);

router.get("/", staffQueryMiddleware, getAllStaffs);
router.get("/actors", staffQueryMiddleware, getAllActors);
router.get("/directors", staffQueryMiddleware, getAllDirectors);
router.get("/:staffId", checkStaffExists, getStaffById);
router.get("/country/:countryId", [staffQueryMiddleware,checkCountryExists], getStaffsByCountryId);

export default router;