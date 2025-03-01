import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    amount: {
      type: Number,
      required: [true, "Donation amount is required"],
      min: [1, "Amount must be greater than zero"],
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
