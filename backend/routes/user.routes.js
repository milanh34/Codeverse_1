import express from "express";
import {
  acceptVolunteerRequest,
  createVolunteerRequest,
  getPendingRequests,
  getUserRequests,
  rejectVolunteerRequest,
} from "../controllers/request.controller.js";
import {
  changePassword,
  getMyProfile,
  login,
  logout,
  newUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { multerUpload } from "../lib/multer.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/new",
  multerUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  newUser
);
router.post("/login", login);

router.use(isAuthenticated);

router.get("/me", getMyProfile);

router.get("/logout", logout);

router.post("/change-password", changePassword);

router.put(
  "/update-profile",
  multerUpload.fields([{ name: "file", maxCount: 1 }]),
  updateProfile
);

// Request routes
router.post("/request/:eventId", isAuthenticated, createVolunteerRequest);
router.get("/my-requests", isAuthenticated, getUserRequests);
router.get("/pending-requests", isAuthenticated, getPendingRequests);
router.put(
  "/request/:requestId/accept",
  isAuthenticated,
  acceptVolunteerRequest
);
router.put(
  "/request/:requestId/reject",
  isAuthenticated,
  rejectVolunteerRequest
);

export default router;
