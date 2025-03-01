import { TryCatch } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../middlewares/error.middleware.js";
import { Admin } from "../models/admin.model.js";
import { NGO } from "../models/ngo.model.js";
import { sendToken } from "../lib/token.js";

export const loginAdmin = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const isMatch = await admin.isPasswordCorrect(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  sendToken(res, admin, 200, "Admin logged in successfully");
});

export const getPendingNGOs = TryCatch(async (req, res, next) => {
  const pendingNGOs = await NGO.find({ verificationStatus: 'pending' })
    .select('-password')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: pendingNGOs.length,
    ngos: pendingNGOs
  });
});

export const getNGODetails = TryCatch(async (req, res, next) => {
  const { ngoId } = req.params;

  const ngo = await NGO.findById(ngoId)
    .select('-password')

  if (!ngo) {
    return next(new ErrorHandler("NGO not found", 404));
  }

  res.status(200).json({
    success: true,
    ngo
  });
});

export const verifyNGO = TryCatch(async (req, res, next) => {
  const { ngoId } = req.params;
  const { status } = req.body;
  const adminId = req.user;

  if (!['verified', 'rejected'].includes(status)) {
    return next(new ErrorHandler("Invalid verification status", 400));
  }

  const ngo = await NGO.findById(ngoId);
  if (!ngo) {
    return next(new ErrorHandler("NGO not found", 404));
  }

  const updateData = {
    verificationStatus: status,
  };

  const updatedNGO = await NGO.findByIdAndUpdate(
    ngoId,
    updateData,
    { new: true }
  ).select('-password');

  // Create notification for NGO (you'll need to implement this)
  // await createNotification({
  //   recipient: ngo._id,
  //   type: 'verification',
  //   content: `Your NGO verification has been ${status}. ${comment || ''}`
  // });

  res.status(200).json({
    success: true,
    message: `NGO ${status} successfully`,
    ngo: updatedNGO
  });
});

export const getDashboardStats = TryCatch(async (req, res, next) => {
  const [
    totalNGOs,
    pendingVerifications,
    verifiedNGOs,
    rejectedNGOs
  ] = await Promise.all([
    NGO.countDocuments(),
    NGO.countDocuments({ verificationStatus: 'pending' }),
    NGO.countDocuments({ verificationStatus: 'verified' }),
    NGO.countDocuments({ verificationStatus: 'rejected' })
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalNGOs,
      pendingVerifications,
      verifiedNGOs,
      rejectedNGOs
    }
  });
});
