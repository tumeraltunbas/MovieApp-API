import expressAsyncHandler from "express-async-handler";
import Review from "../models/Review.js";

export const createReview = expressAsyncHandler(async(req, res, next) => {

    const {content, rating} = req.body;
    const {movieId} = req.params;
    
    await Review.create({
        content: content,
        rating: rating,
        movie_id: movieId,
        user_id: req.user.id        
    });

    return res
    .status(200)
    .json({
        success: true,
        message: "Review has been created"
    });

})