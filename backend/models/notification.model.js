import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notifications: [{
      content: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ["event", "donation", "general"],
        default: "general"
      },
      isRead: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
