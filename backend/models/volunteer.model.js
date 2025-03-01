import mongoose, { Schema } from "mongoose";

const volunteerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

export const Volunteer = mongoose.model("Volunteer", volunteerSchema);
