import { ErrorHandler, TryCatch } from "./error.middleware.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
});

export const isAdmin = TryCatch(async (req, res, next) => {
  const admin = await Admin.findById(req.user);
  if (!admin) {
    return next(new ErrorHandler("Unauthorized: Admin access required", 403));
  }
  next();
});
