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

router.post("/new", newNGO);
router.post("/login", loginNGO);

router.use(isAuthenticated);

router.get("/me", getMyProfile);

router.get("/logout", logout);

router.post("/change-password", changePassword);

router.put("/update-profile", updateProfile);

export default router;
