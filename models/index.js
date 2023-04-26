import { sequelize } from "../helpers/database/database.js";
import Staff from "./Staff.js";
import Country from "./Country.js";
import Movie from "./Movie.js";
import Genre from "./Genre.js";
import Role from "./Role.js";
import User from "./User.js";
import Review from "./Review.js";
import Favorite from "./Favorite.js";

//Staff and role many to many
Staff.belongsToMany(Role, { through: "StaffRoles" });
Role.belongsToMany(Staff, { through: "StaffRoles" });

//Staff and country many to many
Staff.belongsToMany(Country, { through: "StaffCountries" });
Country.belongsToMany(Staff, { through: "StaffCountries" });

//Movie and Staff many to many
Movie.belongsToMany(Staff, { through: "MovieStaff" });
Staff.belongsToMany(Movie, { through: "MovieStaff" });

//Movie and genre many to many
Movie.belongsToMany(Genre, { through: "MovieGenres" });
Genre.belongsToMany(Movie, { through: "MovieGenres" });

//User and favorite one to many
User.hasMany(Favorite, {
    onDelete: "CASCADE",
});
Favorite.belongsTo(User);

//Movie and favorite one to many
Movie.hasMany(Favorite, {
    onDelete: "CASCADE"
});
Favorite.belongsTo(Movie, {
    foreignKey: "MovieId"
});

//Review and user one to many
User.hasMany(Review, {
    onDelete: "CASCADE"
});
Review.belongsTo(User, {
    foreignKey: "UserId",
});

//Review and Movie one to many
Movie.hasMany(Review, {
    onDelete: "CASCADE"
});
Review.belongsTo(Movie, {
    foreignKey: "MovieId"
});

//Staff and admin one to many
User.hasMany(Staff);
Staff.belongsTo(User, {
    foreignKey: "UserId"
});

//Movie and admin one to many
User.hasMany(Movie);
Movie.belongsTo(User, {
    foreignKey: "UserId"
});

//Country and admin one to many
User.hasMany(Country);
Country.belongsTo(User, {
    foreignKey: "UserId",
});

//Genre and admin one to many
User.hasMany(Genre);
Genre.belongsTo(User, {
    foreignKey: "UserId"
});

await sequelize.sync();
export {Staff, Role, Country, User, Favorite, Genre, Movie, Review};