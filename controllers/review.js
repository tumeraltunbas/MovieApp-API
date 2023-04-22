import expressAsyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Movie from "../models/Movie.js";
import CustomError from "../helpers/error/CustomError.js";

export const createReview = expressAsyncHandler(async(req, res, next) => {

    const {content, rating} = req.body;
    const {movieId} = req.params;

    const review = await Review.findOne({
        where: {
            MovieId: movieId,
            UserId: req.user.id
        }
    });

    if(review){
        return next(new CustomError(400, "You alredy shared a review about this movie"));
    }

    await Review.create({
        content: content,
        rating: rating,
        MovieId: movieId,
        UserId: req.user.id        
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

export const deleteReview = expressAsyncHandler(async(req, res, next) => {

    const {reviewId} = req.params;

    const review = await Review.findOne({where: {
        id: reviewId,
        isVisible: true
    }});

    review.isVisible = false;
    await review.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Review has been deleted"
    });

});

export const getReviewsByMovieId = expressAsyncHandler(async(req, res, next) => {

    const {movieId} = req.params;

    const reviews = await Review.findAll({
        where: {
            isVisible: true,
        },
        include: {
            model: Movie,
            where: { id: movieId }    
        }
        
    });

    return res
    .status(200)
    .json({
        success: true,
        reviews: reviews
    });

});

export const getReviewById = expressAsyncHandler(async(req, res, next) => {

    const {reviewId} = req.params;

    const review = await Review.findOne({where: {
        id: reviewId,
        isVisible: true
    }});

    return res
    .status(200)
    .json({
        success: true,
        review: review
    });

});