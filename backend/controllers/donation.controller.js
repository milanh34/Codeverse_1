import { TryCatch } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../middlewares/error.middleware.js";
import { Donation } from "../models/donation.model.js";
import { NGO } from "../models/ngo.model.js";
import { Event } from "../models/event.model.js";
import { Notification } from "../models/notification.model.js";
import { v4 as uuidv4 } from 'uuid';

export const createDonation = TryCatch(async (req, res, next) => {
    const { ngoId, amount, eventId } = req.body;
    const userId = req.user;

    if (!ngoId || !amount) {
        return next(new ErrorHandler("NGO ID and amount are required", 400));
    }

    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
        return next(new ErrorHandler("NGO not found", 404));
    }

    // Create unique order ID
    const orderId = uuidv4();

    // Create donation data
    const donationData = {
        user: userId,
        ngo: ngoId,
        amount,
        orderId
    };

    // If eventId is provided, verify and include it
    if (eventId) {
        console.log("Hi");
        const event = await Event.findById(eventId);
        if (!event) {
            return next(new ErrorHandler("Event not found", 404));
        }
        donationData.event = eventId;

        // Update event's collected funds
        await Event.findByIdAndUpdate(eventId, {
            $inc: { collectedFunds: amount }
        });
    }

    // Create donation record
    const donation = await Donation.create(donationData);

    // Update NGO's total funds
    await NGO.findByIdAndUpdate(ngoId, {
        $inc: { totalFunds: amount }
    });

    res.status(201).json({
        success: true,
        message: "Donation created successfully",
        donation
    });
});

export const getUserDonations = TryCatch(async (req, res, next) => {
    const userId = req.user;

    const donations = await Donation.find({ user: userId })
        .populate("ngo", "name profile_image")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        donations
    });
});

export const getNGODonations = TryCatch(async (req, res, next) => {
    const ngoId = req.user;

    console.log("coun")
    const donations = await Donation.find({ ngo: ngoId })
    .populate("user", "name profile_image")
    .sort({ createdAt: -1 });
    console.log("coun")

    res.status(200).json({
        success: true,
        donations
    });
});

export const getNGOFunds = TryCatch(async (req, res, next) => {
    const ngoId = req.user;

    const ngo = await NGO.findById(ngoId).select("totalFunds name");
    if (!ngo) {
        return next(new ErrorHandler("NGO not found", 404));
    }

    res.status(200).json({
        success: true,
        totalFunds: ngo.totalFunds,
        ngoName: ngo.name
    });
});

// export const getDonationStats = TryCatch(async (req, res, next) => {
//     const ngoId = req.user;

//     const stats = await Donation.aggregate([
//         {
//             $match: { ngo: ngoId }
//         },
//         {
//             $group: {
//                 _id: null,
//                 totalDonations: { $sum: 1 },
//                 totalAmount: { $sum: "$amount" },
//                 averageDonation: { $avg: "$amount" }
//             }
//         }
//     ]);

//     const monthlyDonations = await Donation.aggregate([
//         {
//             $match: { ngo: ngoId }
//         },
//         {
//             $group: {
//                 _id: {
//                     month: { $month: "$createdAt" },
//                     year: { $year: "$createdAt" }
//                 },
//                 total: { $sum: "$amount" },
//                 count: { $sum: 1 }
//             }
//         },
//         { $sort: { "_id.year": -1, "_id.month": -1 } }
//     ]);

//     res.status(200).json({
//         success: true,
//         stats: stats[0] || {
//             totalDonations: 0,
//             totalAmount: 0,
//             averageDonation: 0
//         },
//         monthlyDonations
//     });
// });
