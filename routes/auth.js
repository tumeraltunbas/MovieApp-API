import { Router } from "express";
import { signUp } from "../controllers/auth.js";

const router = Router();

router.post("/signUp", signUp);


export default router;