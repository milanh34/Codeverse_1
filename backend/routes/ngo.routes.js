import express from "express";
import {
  newNGO,
  loginNGO,
  getMyProfile,
  logout,
  changePassword,
  updateProfile,
} from "../controllers/ngo.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

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

router.get("/me", getMyProfile);

router.get("/logout", logout);

router.post("/change-password", changePassword);

router.put(
  "/update-profile",
  multerUpload.fields([{ name: "file", maxCount: 1 }]),
  updateProfile
);

export default router;
