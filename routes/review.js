import {Router} from "express";
import { getReviewOwnerAccess, isAuth } from "../middlewares/auth/auth.js";
import { createReview, editReview, deleteReview } from "../controllers/review.js";
import { checkReviewExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router({mergeParams: true});

router.post("/", isAuth, createReview);
router.put("/:reviewId", [isAuth, checkReviewExists, getReviewOwnerAccess], editReview);
router.put("/:reviewId/delete", checkReviewExists, deleteReview);

export default router;