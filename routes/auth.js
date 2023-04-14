import { Router } from "express";
import { signUp, emailVerification, signIn, passwordChange } from "../controllers/auth.js";
import { checkUserExists } from "../middlewares/query/databaseQueryHelpers.js";
import { isAuth } from "../middlewares/auth/auth.js";

const router = Router();

router.post("/signUp", signUp);
router.get("/emailVerification", emailVerification);
router.post("/signIn", checkUserExists, signIn);
router.post("/passwordChange", isAuth, passwordChange);


export default router;