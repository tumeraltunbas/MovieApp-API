import { Router } from "express";
import { signUp, emailVerification, signIn, googleAuthCallback, logout, passwordChange, emailChange, forgotPassword, resetPassword, deactiveAccount, enable2FA, verify2FA, validate2FA} from "../controllers/auth.js";
import { checkUserExists } from "../middlewares/query/databaseQueryHelpers.js";
import { isAuth } from "../middlewares/auth/auth.js";
import passport from "passport";

const router = Router();

router.post("/signUp", signUp);
router.get("/emailVerification", emailVerification);
router.post("/signIn", checkUserExists, signIn);
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google"), googleAuthCallback);
router.get("/logout", isAuth, logout);
router.put("/passwordChange", isAuth, passwordChange);
router.put("/emailChange", isAuth, emailChange);
router.post("/forgotPassword", checkUserExists, forgotPassword);
router.put("/resetPassword", resetPassword);
router.post("/deactive", isAuth, deactiveAccount);
router.get("/2fa/enable", isAuth, enable2FA);
router.post("/2fa/verify", isAuth, verify2FA);
router.post("/2fa/validate", validate2FA);


export default router;