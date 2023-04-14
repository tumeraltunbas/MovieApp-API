import Staff from "./Staff.js";
import Country from "./Country.js";
import Movie from "./Movie.js";
import Genre from "./Genre.js";
import Role from "./Role.js";
import Review from "./Review.js";
import User from "./User.js";

// for country_id in Actor table. 
Staff.hasOne(Country, {
    foreignKey: "country_id"
});
Country.belongsTo(Staff);

// Movie and Actor many to many
Movie.belongsToMany(Staff, {through: "ActorMovies"});
Staff.belongsToMany(Movie, {through: "ActorMovies"});

//Genre and movies many to many
Movie.belongsToMany(Genre, {through: "MovieGenres"});
Genre.belongsToMany(Movie, {through: "MovieGenres"});

//Role and staff many to many
Role.belongsToMany(Staff, {through: "StaffRoles"});
Staff.belongsToMany(Role, {through: "StaffRoles"});

//Review and movie one to many
Movie.hasMany(Review, {
    foreignKey: "movie_id"
});
Review.belongsTo(Movie);

//Review and user one to many
User.hasMany(Review, {
    foreignKey: "user_id"
});
Review.belongsTo(User);
