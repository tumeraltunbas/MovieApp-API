import Staff from "./Staff";
import Country from "./Country";
import Movie from "./Movie";
import Genre from "./Genre";
import Role from "./Role";

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