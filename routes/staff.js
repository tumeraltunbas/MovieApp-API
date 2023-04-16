import {Router} from "express";
import {isAuth, getAdminAccess} from "../middlewares/auth/auth.js";
import upload from "../helpers/multer/multer.js";
import { createStaff } from "../controllers/staff.js";

const router = Router();

router.post("/", [isAuth, getAdminAccess, upload.single("file")], createStaff);


export default router;