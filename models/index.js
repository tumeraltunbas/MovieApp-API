import { sequelize } from "../helpers/database/database.js";
import Staff from "./Staff.js";
import Country from "./Country.js";
import Movie from "./Movie.js";
import Genre from "./Genre.js";
import Role from "./Role.js";
import User from "./User.js";
import Review from "./Review.js";

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

//Review and user one to many
User.hasMany(Review, {
    as: "reviews"
});
Review.belongsTo(User, {
    foreignKey: "UserId"
});

//Review and Movie one to many
Movie.hasMany(Review, {
    as: "reviews"
});
Review.belongsTo(Movie, {
    foreignKey: "MovieId"
});

//Staff and admin one to many
User.hasMany(Staff, {
    as: "staffs"
});
Staff.belongsTo(User, {
    foreignKey: "UserId"
});

//Role and admin one to many
User.hasMany(Role, {
    as: "roles"
});
Role.belongsTo(User, {
    foreignKey: "UserId"
});

//Movie and admin one to many
User.hasMany(Movie, {
    as: "movies"
});
Movie.belongsTo(User, {
    foreignKey: "UserId"
});

//Country and admin one to many
User.hasMany(Country, {
    as: "countries"
});
Country.belongsTo(User, {
    foreignKey: "UserId"
});

//Genre and admin one to many
User.hasMany(Genre, {
    as: "genres"
});
Genre.belongsTo(User, {
    foreignKey: "UserId"
});

await sequelize.sync();
export {Staff, Role, Country};