import { Router } from "express";
import { signUp, emailVerification, signIn } from "../controllers/auth.js";
import { checkUserExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router();

router.post("/signUp", signUp);
router.get("/emailVerification", emailVerification);
router.post("/signIn", checkUserExists, signIn);


export default router;