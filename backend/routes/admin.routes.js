import express from "express";
import { isAdmin } from "../middlewares/auth.middleware.js";
import {
  loginAdmin,
  getPendingNGOs,
  getNGODetails,
  verifyNGO,
  getDashboardStats
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);

// Protected routes
router.use(isAdmin);
router.get("/pending-ngos", getPendingNGOs);
router.get("/ngo/:ngoId", getNGODetails);
router.post("/verify-ngo/:ngoId", verifyNGO);
router.get("/dashboard-stats", getDashboardStats);

export default router;
