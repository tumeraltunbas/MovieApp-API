import {Router} from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import genreRoutes from "./genre.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/genre", genreRoutes);

export default router;