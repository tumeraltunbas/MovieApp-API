import { Router } from "express";
import { signUp, emailVerification, signIn, logout, passwordChange, emailChange, forgotPassword, resetPassword, deactiveAccount} from "../controllers/auth.js";
import { checkUserExists } from "../middlewares/query/databaseQueryHelpers.js";
import { isAuth } from "../middlewares/auth/auth.js";

const router = Router();

router.post("/signUp", signUp);
router.get("/emailVerification", emailVerification);
router.post("/signIn", checkUserExists, signIn);
router.get("/logout", isAuth, logout);
router.put("/passwordChange", isAuth, passwordChange);
router.put("/emailChange", isAuth, emailChange);
router.post("/forgotPassword", checkUserExists, forgotPassword);
router.put("/resetPassword", resetPassword);
router.post("/deactive", isAuth, deactiveAccount);


export default router;