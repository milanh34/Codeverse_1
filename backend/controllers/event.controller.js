import { TryCatch } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../middlewares/error.middleware.js";
import { Event } from "../models/event.model.js";
import { NGO } from "../models/ngo.model.js";

export const createEvent = TryCatch(async (req, res, next) => {
  const { name, description, date, location } = req.body;
  const ngoId = req.user; 

  const ngo = await NGO.findById(ngoId);
  if (!ngo) return next(new ErrorHandler("Only NGOs can create events", 403));

  const event = await Event.create({
    name,
    description,
    date,
    location,
    organizer: ngoId,
  });

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event,
  });
});

export const updateEvent = TryCatch(async (req, res, next) => {
  const { eventId } = req.params;
  const updates = req.body;
  const ngoId = req.user;

  const event = await Event.findById(eventId);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  if (event.organizer.toString() !== ngoId) {
    return next(new ErrorHandler("You can only update your own events", 403));
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    event: updatedEvent,
  });
});

export const deleteEvent = TryCatch(async (req, res, next) => {
  const { eventId } = req.params;
  const ngoId = req.user;

  const event = await Event.findById(eventId);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  if (event.organizer.toString() !== ngoId) {
    return next(new ErrorHandler("You can only delete your own events", 403));
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});

export const getAllEvents = TryCatch(async (req, res, next) => {
  const events = await Event.find().populate("organizer", "name username profile_image");

  res.status(200).json({
    success: true,
    events,
  });
});

export const getEventById = TryCatch(async (req, res, next) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId).populate("organizer", "name email");

  if (!event) return next(new ErrorHandler("Event not found", 404));

  res.status(200).json({
    success: true,
    event,
  });
});
