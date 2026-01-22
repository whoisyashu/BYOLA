import express from "express";
import { getLawyerProfile } from "../controllers/lawyer.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const lawyerRoutes = express.Router();

lawyerRoutes.get("/profile", getLawyerProfile);

export default lawyerRoutes;