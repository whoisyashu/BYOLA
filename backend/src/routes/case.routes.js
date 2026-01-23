import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getMyCase, createCase } from "../controllers/case.controller.js";

const caseRoutes = express.Router();

caseRoutes.post("/", protect, createCase);
caseRoutes.get("/my", protect, getMyCase);

export default caseRoutes;