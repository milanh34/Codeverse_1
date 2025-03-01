import { sendToken } from "../lib/token.js";
import { ErrorHandler, TryCatch } from "../middlewares/error.middleware.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const newUser = TryCatch(async (req, res, next) => {
  const { name, email, password, role, teamId } = req.body;

  console.count("newUser");
  if (!name || !email || !password || !role || !teamId) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  console.count("newUser");

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  console.count("newUser");

  const user = await User.create({
    name,
    email,
    password,
    role,
    teamId,
  });

  console.count("newUser");

  sendToken(res, user, 201, "User registered successfully");
});

export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  console.count("login");
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  console.count("login");

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  console.count("login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
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
