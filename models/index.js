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
    foreignKey: "user_id"
});
Review.belongsTo(User);

//Review and Movie one to many
Movie.hasMany(Review, {
    foreignKey: "movie_id"
});
Review.belongsTo(Movie);

//Staff and admin one to many
User.hasMany(Staff, {
    foreignKey: "admin_id"
});
Staff.belongsTo(User);

//Role and admin one to many
User.hasMany(Role, {
    foreignKey: "admin_id"
});
Role.belongsTo(User);

//Movie and admin one to many
User.hasMany(Movie, {
    foreignKey: "admin_id"
});
Movie.belongsTo(User);

//Country and admin one to many
User.hasMany(Country, {
    foreignKey: "admin_id"
});
Country.belongsTo(User);

//Genre and admin one to many
User.hasMany(Genre, {
    foreignKey: "admin_id"
});
Genre.belongsTo(User);

await sequelize.sync();
export {Staff, Role, Country};