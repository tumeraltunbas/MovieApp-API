import {Router} from "express";
import { getReviewOwnerAccess, isAuth } from "../middlewares/auth/auth.js";
import { createReview, editReview } from "../controllers/review.js";
import { isReviewExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router({mergeParams: true});

router.post("/", isAuth, createReview);
router.put("/:reviewId", [isAuth, isReviewExists, getReviewOwnerAccess], editReview);

export default router;