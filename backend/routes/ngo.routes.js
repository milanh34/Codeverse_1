import express from "express";
import {
  getNGODonations,
  getNGOFunds,
} from "../controllers/donation.controller.js";
import {
  changePassword,
  createPost,
  deletePost,
  getMyNGOProfile,
  getMyPosts,
  getNGOCompleteDetails,
  getPendingVolunteerRequests,
  handleVolunteerRequest,
  loginNGO,
  logoutNGO,
  newNGO,
  updateNGOProfile,
  getAllNGOsPublic,
} from "../controllers/ngo.controller.js";
import { multerUpload } from "../lib/multer.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post(
  "/new",
  multerUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  newNGO
);

router.post("/login", loginNGO);

router.use(isAuthenticated);

router.get("/me", isAuthenticated, getMyNGOProfile);

router.get("/logout", logoutNGO);

router.post("/change-password", changePassword);

router.put(
  "/update-profile",
  multerUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateNGOProfile
);

// Volunteer request handling routes
router.get("/volunteer-requests", isAuthenticated, getPendingVolunteerRequests);
router.put(
  "/volunteer-request/:requestId/:action",
  isAuthenticated,
  handleVolunteerRequest
);

// Social Media routes
router.post(
  "/post/new",
  isAuthenticated,
  multerUpload.fields([{ name: "media", maxCount: 5 }]),
  createPost
);

router.get("/posts", isAuthenticated, getMyPosts);
router.delete("/post/:postId", isAuthenticated, deletePost);

// Donation routes
router.get("/donations", isAuthenticated, getNGODonations);
router.get("/funds", isAuthenticated, getNGOFunds);

//ngo details for the donation and allocation page
router.get("/complete-details", isAuthenticated, getNGOCompleteDetails);

// Public routes
router.get("/public/all", getAllNGOsPublic);

export default router;
