import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { getPendingLawyers, approveLawyer, rejectLawyer } from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/dashboard", protect, authorize("admin"),(req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

adminRoutes.get("/lawyers/pending", protect, authorize("admin"), getPendingLawyers);
adminRoutes.patch("/lawyers/:lawyerProfileId/approve", protect, authorize("admin"), approveLawyer);
adminRoutes.patch("/lawyers/:lawyerProfileId/reject", protect, authorize("admin"), rejectLawyer);

export default adminRoutes;
