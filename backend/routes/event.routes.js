import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
} from "../controllers/event.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/all", getAllEvents);
router.get("/:eventId", getEventById);

// Protected routes (NGO only)
router.post("/new", isAuthenticated, createEvent);
router.put("/:eventId", isAuthenticated, updateEvent);
router.delete("/:eventId", isAuthenticated, deleteEvent);

export default router;
