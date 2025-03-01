import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
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
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        }
    },
    { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
