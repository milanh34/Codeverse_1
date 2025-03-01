import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true,
    },
    phone_no: {
      type: String,
      // required: true,
      trim: true,
    },
    age: {
      type: Number,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String },
      latitude: { type: String },
      longitude: { type: String },
    },
    profile_image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    aadhaar: {
      type: String,
      // required: true
    },
    certificate: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    // notifications: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Notification",
    //   },
    // ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.generateAccessToken = function () {
//     return jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             username: this.username,
//             name: this.name,
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );
// };

// userSchema.methods.generateRefreshToken = function () {
//     return jwt.sign(
//         { _id: this._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );
// };

export const User = mongoose.model("User", userSchema);
