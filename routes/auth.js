import { Router } from "express";
import { signUp, emailVerification, signIn, logout, passwordChange, forgotPassword } from "../controllers/auth.js";
import { checkUserExists } from "../middlewares/query/databaseQueryHelpers.js";
import { isAuth } from "../middlewares/auth/auth.js";

const router = Router();

router.post("/signUp", signUp);
router.get("/emailVerification", emailVerification);
router.post("/signIn", checkUserExists, signIn);
router.get("/logout", isAuth, logout);
router.post("/passwordChange", isAuth, passwordChange);
router.post("/forgotPassword", checkUserExists, forgotPassword);


export default router;