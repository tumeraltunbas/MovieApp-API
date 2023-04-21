import {Router} from "express";
import { isAuth } from "../middlewares/auth/auth.js";
import { getProfile, editUser, uploadProfileImage, deleteProfileImage, getFavorites } from "../controllers/user.js";
import upload from "../helpers/multer/multer.js";

const router = Router();

router.get("/profile", isAuth, getProfile);
router.put("/edit", isAuth, editUser);
router.post("/uploadProfileImage", [isAuth, upload.single("file")], uploadProfileImage);
router.get("/deleteProfileImage", isAuth, deleteProfileImage);
router.get("/favorites", isAuth, getFavorites);


export default router;