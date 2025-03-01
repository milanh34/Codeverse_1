import { s3Upload } from "../lib/s3.js";
import { sendToken } from "../lib/token.js";
import { ErrorHandler, TryCatch } from "../middlewares/error.middleware.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const newUser = TryCatch(async (req, res, next) => {
  const {
    username,
    email,
    name,
    password,
    phone_no,
    age,
    gender,
    address,
    aadhaar,
  } = req.body;

  if (!username || !name || !email || !password) {
    return next(
      new ErrorHandler("Username, email, name, and password are required", 400)
    );
  }

  const files = req.files;

  if (!files?.file?.[0]) {
    return next(new ErrorHandler("Profile image is required", 400));
  }

  if (!files?.certificate?.[0]) {
    return next(new ErrorHandler("Certificate is required", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const profile_image = await s3Upload(files.file[0]);
  const certificate = await s3Upload(files.certificate[0]);

  const userData = {
    username,
    email,
    name,
    password,
  };

  if (phone_no) userData.phone_no = phone_no;
  if (age) userData.age = age;
  if (gender) userData.gender = gender;
  if (profile_image) userData.profile_image = profile_image.url;
  if (aadhaar) userData.aadhaar = aadhaar;
  if (certificate) userData.certificate = certificate.url;

  if (address) {
    userData.address = {
      street: address.street || undefined,
      city: address.city || undefined,
      state: address.state || undefined,
      pincode: address.pincode || undefined,
      latitude: address.latitude || undefined,
      longitude: address.longitude || undefined,
    };
  }

  const user = await User.create(userData);

  sendToken(res, user, 201, "User registered successfully");
});

export const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  console.count("login");
  if (!username || !password) {
    return next(new ErrorHandler("Username and password are required", 400));
  }

  console.count("login");

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  console.count("login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  console.count("login");

  sendToken(res, user, 200, "User logged in successfully");

  console.count("login");
});

export const logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("auth-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

export const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user).select("-password");

  return res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = TryCatch(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect old password", 400));
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const updateProfile = TryCatch(async (req, res, next) => {
  const userId = req.user;
  const { email, name, phone_no, age, gender, address } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const updates = {};
  if (email) updates.email = email;
  if (name) updates.name = name;
  if (phone_no) updates.phone_no = phone_no;
  if (age) updates.age = age;
  if (gender) updates.gender = gender;

  if (address) {
    updates.address = {
      street: address.street || user.address?.street,
      city: address.city || user.address?.city,
      state: address.state || user.address?.state,
      pincode: address.pincode || user.address?.pincode,
      latitude: address.latitude || user.address?.latitude,
      longitude: address.longitude || user.address?.longitude,
    };
  }

  const files = req.files;
  if (files?.file?.[0]) {
    const profile_image = await s3Upload(files.file[0]);
    updates.profile_image = profile_image.url;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    return next(new ErrorHandler("Profile update failed", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});
