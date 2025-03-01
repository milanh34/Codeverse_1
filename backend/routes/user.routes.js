import express from "express";
import {
  createVolunteerRequest,
  getUserRequests,
} from "../controllers/request.controller.js";
import {
  changePassword,
  getMyProfile,
  login,
  logout,
  newUser,
  toggleFollowNGO,
  updateProfile,
  getNotifications,
  markNotificationAsRead,
  getVolunteerHistory,
  getFollowingNGOPosts,
  togglePostLike,
  addComment,
  getAllNGOsWithFollowStatus,
} from "../controllers/user.controller.js";
import { multerUpload } from "../lib/multer.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    createDonation,
    getUserDonations,
} from "../controllers/donation.controller.js";

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
// router.get("/pending-requests", isAuthenticated, getPendingRequests);
// router.put(
//   "/request/:requestId/accept",
//   isAuthenticated,
//   acceptVolunteerRequest
// );
// router.put(
//   "/request/:requestId/reject",
//   isAuthenticated,
//   rejectVolunteerRequest
// );

// Follow/Unfollow routes
router.post("/toggle-follow/:ngoId", isAuthenticated, toggleFollowNGO);

// Notification routes
router.get("/notifications", isAuthenticated, getNotifications);
router.put(
  "/notifications/:notificationId/read",
  isAuthenticated,
  markNotificationAsRead
);

router.get("/volunteer-history", isAuthenticated, getVolunteerHistory);

// Social Media routes
router.get("/posts/following", isAuthenticated, getFollowingNGOPosts);
router.post("/post/:postId/toggle-like", isAuthenticated, togglePostLike);
router.post("/post/:postId/comment", isAuthenticated, addComment);

// Donation routes
router.post("/donation/create", isAuthenticated, createDonation);
router.get("/donations", isAuthenticated, getUserDonations);

router.get("/all-with-follow-status", isAuthenticated, getAllNGOsWithFollowStatus);

export default router;
