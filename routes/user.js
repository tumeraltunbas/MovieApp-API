import {Router} from "express";
import { isAuth } from "../middlewares/auth/auth.js";
import { editUser, uploadProfileImage } from "../controllers/user.js";
import upload from "../helpers/multer/multer.js";

const router = Router();

router.put("/edit", isAuth, editUser);
router.post("/uploadProfileImage", [isAuth, upload.single("file")], uploadProfileImage);


export default router;