import {Router} from "express";
import { getAdminAccess, getReviewOwnerAccess, isAuth } from "../middlewares/auth/auth.js";
import { createReview, editReview, deleteReview, getAllReviews, getReviewById } from "../controllers/review.js";
import { checkReviewExists } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router({mergeParams: true});

router.post("/", isAuth, createReview);
router.put("/:reviewId", [isAuth, checkReviewExists, getReviewOwnerAccess], editReview);
router.put("/:reviewId/delete", checkReviewExists, deleteReview);

router.get("/", [isAuth, getAdminAccess], getAllReviews);
router.get("/:reviewId", checkReviewExists, getReviewById);

export default router;