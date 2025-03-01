import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String },
      latitude: { type: String },
      longitude: { type: String },
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    isEmergency: {
      type: Boolean,
      default: false,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    event_gallery: [
      {
        type: String,
        trim: true,
      },
    ],
    badges: [
      {
        type: String,
      },
    ],
    allocatedFund: {
      type: Number,
      default: 0,
    },
    collectedFunds: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
