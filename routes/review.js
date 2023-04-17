import {Router} from "express";
import { isAuth } from "../middlewares/auth/auth.js";
import { createReview } from "../controllers/review.js";

const router = Router({mergeParams: true});

router.post("/", isAuth, createReview);

export default router;