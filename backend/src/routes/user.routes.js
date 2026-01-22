import express from "express";
import { getMyProfile } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/me", protect, getMyProfile);

export default userRoutes;