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

export const editReview = expressAsyncHandler(async(req, res, next) => {

    const updateInformations = req.body;
    const {reviewId} = req.params;

    const review = await Review.findOne({where: {
        id: reviewId,
        isVisible: true
    }});

    await review.update({...updateInformations});

    return res
    .status(200)
    .json({
        success: true,
        message: "Review has been updated"
    });

});