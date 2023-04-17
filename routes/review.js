import {Router} from "express";
import { getReviewOwnerAccess, isAuth } from "../middlewares/auth/auth.js";
import { createReview, editReview, deleteReview, getReviewsByMovieId, getReviewById } from "../controllers/review.js";
import { checkMovieExists, checkReviewExistsInMovie } from "../middlewares/query/databaseQueryHelpers.js";

const router = Router({mergeParams: true});

router.post("/", isAuth, createReview);
router.put("/:reviewId", [isAuth, checkReviewExistsInMovie, getReviewOwnerAccess], editReview);
router.put("/:reviewId/delete", checkReviewExistsInMovie, deleteReview);

router.get("/", [checkMovieExists], getReviewsByMovieId);
router.get("/:reviewId", checkReviewExistsInMovie, getReviewById);

export default router;