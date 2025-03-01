import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const ngoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "NGO name is required"],
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
    phone_no: {
      type: String,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String },
      latitude: { type: String },
      longitude: { type: String },
    },
    registrationNumber: {
      type: String,
      unique: true,
    },
    socials: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    profile_image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    certificate: {
      type: String,
    },
    badges: [
      {
        type: String,
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    totalFunds: {
      type: Number,
      default: 0,
    },
    staff: {
      type: Number,
      default: 0,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
  },
  { timestamps: true }
);

ngoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

ngoSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ngoSchema.methods.generateAccessToken = function () {
//     return jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             name: this.name,
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );
// };

// ngoSchema.methods.generateRefreshToken = function () {
//     return jwt.sign(
//         { _id: this._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );
// };

export const NGO = mongoose.model("NGO", ngoSchema);
