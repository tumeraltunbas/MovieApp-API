import {Router} from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import genreRoutes from "./genre.js";
import roleRoutes from "./role.js";
import countryRoutes from "./country.js";
import staffRoutes from "./staff.js";
import movieRoutes from "./movie.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/genre", genreRoutes);
router.use("/role", roleRoutes);
router.use("/country", countryRoutes);
router.use("/staff", staffRoutes);
router.use("/movie", movieRoutes);

export default router;