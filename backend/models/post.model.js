import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    media: [
      {
        type: String,
      },
    ],
    ngo: {
      type: Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
