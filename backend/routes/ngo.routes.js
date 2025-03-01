import express from "express";
import {
  changePassword,
  getMyNGOProfile,
  getPendingVolunteerRequests,
  handleVolunteerRequest,
  loginNGO,
  logoutNGO,
  newNGO,
  updateNGOProfile,
  createPost,
  deletePost,
  getMyPosts,
} from "../controllers/ngo.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { multerUpload } from "../lib/multer.js";

const router = express.Router();

router.post(
  "/new",
  multerUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  newNGO
);

router.post("/login", loginNGO);

router.use(isAuthenticated);

router.get("/me", getMyNGOProfile);

router.get("/logout", logoutNGO);

router.post("/change-password", changePassword);

router.put(
  "/update-profile",
  multerUpload.fields([{ name: "file", maxCount: 1 }]),
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

export default router;
