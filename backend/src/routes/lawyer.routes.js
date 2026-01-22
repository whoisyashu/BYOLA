import express from "express";
import { getLawyerProfile, submitLawyerOnboarding } from "../controllers/lawyer.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const lawyerRoutes = express.Router();

lawyerRoutes.get("/profile", protect, authorize("lawyer"), getLawyerProfile);
lawyerRoutes.post("/onboard", protect, authorize("lawyer"), submitLawyerOnboarding);


export default lawyerRoutes;