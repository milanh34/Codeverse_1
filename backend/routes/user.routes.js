import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  changePassword,
  updateProfile
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/new", newUser);
router.post("/login", login);

router.use(isAuthenticated);

router.get("/me", getMyProfile);

router.get("/logout", logout);

router.post("/change-password", changePassword);

router.put("/update-profile", updateProfile);

export default router;
