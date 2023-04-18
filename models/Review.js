import { DataTypes } from "sequelize";
import {sequelize} from "../helpers/database/database.js";
import Movie from "./Movie.js";

const Review = sequelize.define("Review", {

    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
});

//Hooks
Review.addHook("afterSave", async function(review){

    if(review.changed("rating")){

        const sumRating = await Review.sum("rating", {
            where: { 
                MovieId: review.MovieId, 
                isVisible: true 
            }
        });

        const reviewCount = await Review.count({
            where: {
                MovieId: review.MovieId, 
                isVisible: true 
            }
        });
    
        const averageRating = Number(sumRating / reviewCount).toFixed(1);
        
        const movie = await Movie.findOne({
            where: {
                id: review.MovieId
            }
        });

        movie.rating = averageRating;

        await movie.save();
        
    }
});

await Review.sync();
export default Review;