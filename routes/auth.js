import { Router } from "express";
import { signUp, emailVerification } from "../controllers/auth.js";

const router = Router();

router.post("/signUp", signUp);
router.get("/emailVerification", emailVerification);


export default router;