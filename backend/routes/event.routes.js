import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getAllNGOEvents,
  getNearbyEvents,
  getAllPublicEvents,
} from "../controllers/event.controller.js";
import { multerUpload } from "../lib/multer.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/all", getAllEvents);
router.get("/:eventId", getEventById);
router.get("/public/all", getAllPublicEvents);

// Protected routes (NGO only)

router.get("/ngo/all/", isAuthenticated, getAllNGOEvents);
router.get("/ngo/:id", getAllNGOEvents); // This matches the frontend fetch URL
router.get("/nearby", isAuthenticated, getNearbyEvents);

router.post(
  "/new",
  isAuthenticated,
  multerUpload.fields([{ name: "gallery", maxCount: 10 }]),
  createEvent
);
router.put(
  "/:eventId",
  isAuthenticated,
  multerUpload.fields([{ name: "gallery", maxCount: 10 }]),
  updateEvent
);
router.delete("/:eventId", isAuthenticated, deleteEvent);

export default router;
