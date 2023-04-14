import {Router} from "express";
import { isAuth } from "../middlewares/auth/auth.js";
import { editUser } from "../controllers/user.js";

const router = Router();

router.put("/edit", isAuth, editUser);


export default router;