import { TryCatch } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../middlewares/error.middleware.js";
import { Request } from "../models/request.model.js";
import { Event } from "../models/event.model.js";

export const createVolunteerRequest = TryCatch(async (req, res, next) => {
  const { eventId } = req.params;
  const userId = req.user;

  const event = await Event.findById(eventId);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  const existingRequest = await Request.findOne({
    user: userId,
    event: eventId,
  });
  if (existingRequest)
    return next(new ErrorHandler("Request already exists", 400));

  const request = await Request.create({ user: userId, event: eventId });

  res.status(201).json({
    success: true,
    message: "Request submitted successfully",
    request,
  });
});


export const getUserRequests = TryCatch(async (req, res, next) => {
  const userId = req.user;

  const requests = await Request.find({ user: userId }).populate(
    "event",
    "name date"
  );

  res.status(200).json({
    success: true,
    requests,
  });
});





//redundant 
// export const acceptVolunteerRequest = TryCatch(async (req, res, next) => {
//   const { requestId } = req.params;
//   const ngoId = req.user;

//   const request = await Request.findById(requestId).populate("event");
//   if (!request) return next(new ErrorHandler("Request not found", 404));

//   if (request.event.organizer.toString() !== ngoId) {
//     return next(
//       new ErrorHandler("Only event organizers can accept requests", 403)
//     );
//   }

//   request.status = "accepted";
//   await request.save();

//   res.status(200).json({
//     success: true,
//     message: "Request accepted",
//     request,
//   });
// });

// export const rejectVolunteerRequest = TryCatch(async (req, res, next) => {
//   const { requestId } = req.params;
//   const ngoId = req.user;

//   const request = await Request.findById(requestId).populate("event");
//   if (!request) return next(new ErrorHandler("Request not found", 404));

//   if (request.event.organizer.toString() !== ngoId) {
//     return next(
//       new ErrorHandler("Only event organizers can reject requests", 403)
//     );
//   }

//   request.status = "rejected";
//   await request.save();

//   res.status(200).json({
//     success: true,
//     message: "Request rejected",
//     request,
//   });
// });

// export const getPendingRequests = TryCatch(async (req, res, next) => {
//   const ngoId = req.user;

//   const events = await Event.find({ organizer: ngoId }).select("_id");
//   const eventIds = events.map((event) => event._id);

//   const requests = await Request.find({
//     event: { $in: eventIds },
//     status: "pending",
//   })
//     .populate("user", "username email")
//     .populate("event", "name");

//   res.status(200).json({
//     success: true,
//     requests,
//   });
// });
